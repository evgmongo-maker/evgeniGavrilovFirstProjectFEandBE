/**
 * Auth Middleware - תוכנת עזר לאימות משתמשים
 * 
 * תפקיד: לבדוק אם המשתמש מחובר לפני שהוא יכול לגשת לנתיבים מוגנים
 * איך זה עובד: בודק אם יש token תקין בכותרת הבקשה
 * 
 * שימוש: מוסיפים את ה-middleware הזה לפני כל route שצריך הגנה
 * דוגמה: router.get('/properties', authMiddleware, getProperties)
 */

import jwt from 'jsonwebtoken';

/**
 * סוד JWT - משמש להצפנה ואימות של tokens
 * בפרודקשן אמיתי, זה צריך להיות במשתנה סביבה ולא בקוד
 */
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here-change-in-production';

/**
 * authMiddleware - פונקציה שבודקת אם המשתמש מאומת
 * 
 * @param {Object} req - אובייקט הבקשה מהלקוח
 * @param {Object} res - אובייקט התגובה לשרת
 * @param {Function} next - פונקציה שמעבירה לשלב הבא
 * 
 * תהליך:
 * 1. שולף את ה-token מהכותרת Authorization
 * 2. בודק אם ה-token קיים
 * 3. מאמת את ה-token עם jwt.verify
 * 4. אם תקין - מוסיף את מידע המשתמש ל-req.user ועובר הלאה
 * 5. אם לא תקין - מחזיר שגיאת 401 (לא מורשה)
 */
const authMiddleware = (req, res, next) => {
  try {
    // שליפת ה-token מהכותרת
    // הפורמט: "Bearer <token>"
    const authHeader = req.headers.authorization;
    
    // בדיקה אם הכותרת קיימת ומתחילה ב-"Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'לא מורשה',
        message: 'אין token אימות. אנא התחבר תחילה.' 
      });
    }

    // חילוץ ה-token (מסיר את המילה "Bearer " מהתחלה)
    const token = authHeader.substring(7); // "Bearer " = 7 תווים

    // אימות ה-token
    // jwt.verify בודק אם ה-token תקין ולא פג תוקפו
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // הוספת מידע המשתמש לאובייקט הבקשה
    // עכשיו כל route שרץ אחרי ה-middleware הזה יכול לגשת ל-req.user
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name
    };

    // המשך לשלב הבא (ה-route handler)
    next();

  } catch (error) {
    // טיפול בשגיאות
    console.error('שגיאה באימות token:', error.message);
    
    // בדיקה אם השגיאה היא בגלל token שפג תוקפו
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token פג תוקף',
        message: 'נא להתחבר שוב' 
      });
    }
    
    // שגיאה כללית - token לא תקין
    return res.status(401).json({ 
      error: 'לא מורשה',
      message: 'Token לא תקין' 
    });
  }
};

/**
 * ייצוא ה-middleware לשימוש בקבצים אחרים
 */
export default authMiddleware;
