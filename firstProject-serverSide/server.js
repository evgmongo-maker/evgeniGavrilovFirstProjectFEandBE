/**
 * Server.js - נקודת הכניסה הראשית לשרת
 * 
 * תפקיד: ניהול השרת והגדרת כל ה-routes וה-middleware
 * טכנולוגיות: Node.js + Express
 * 
 * הערות חשובות:
 * - השרת מאזין על פורט 5000
 * - המידע נשמר ב-MongoDB
 * - תמיכה ב-CORS לחיבור עם הצד לקוח
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import propertiesRoutes from './routes/properties.js';
import usersRoutes from './routes/users.js';

// טעינת משתני סביבה מקובץ .env
dotenv.config();

// התחברות למסד נתונים MongoDB
connectDB();

// יצירת אפליקציית Express
const app = express();

// הגדרת פורט השרת - ברירת מחדל 5000
const PORT = process.env.PORT || 5000;

/**
 * Middleware - תוכנות עזר שרצות לפני כל בקשה
 */

// CORS - מאפשר לצד לקוח (Frontend) להתחבר לשרת
// בלי זה, הדפדפן יחסום את הבקשות
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // כתובת הצד לקוח (Vite default port)
  credentials: true // מאפשר שליחת cookies
}));

// Express.json - מאפשר לשרת לקרוא JSON בגוף הבקשה
// בלי זה, לא נוכל לקבל נתונים מהצד לקוח
app.use(express.json());

// Express.urlencoded - מאפשר לקרוא נתונים מטפסים
app.use(express.urlencoded({ extended: true }));

/**
 * Routes - נתיבי API
 * כל הבקשות שמתחילות ב-/api/auth ילכו לקובץ auth.js
 * כל הבקשות שמתחילות ב-/api/properties ילכו לקובץ properties.js
 * כל הבקשות שמתחילות ב-/api/users ילכו לקובץ users.js
 */
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/users', usersRoutes);

/**
 * Root Route - נתיב בסיסי לבדיקה שהשרת עובד
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'ברוך הבא לשרת ניהול נכסים בישראל',
    status: 'Server is running',
    endpoints: {
      auth: '/api/auth (register, login, logout)',
      properties: '/api/properties (CRUD operations)',
      users: '/api/users (me: get/update/delete)'
    }
  });
});

/**
 * Error Handling Middleware - טיפול בשגיאות
 * זה רץ כשיש שגיאה בשרת
 */
app.use((err, req, res, next) => {
  console.error('שגיאה בשרת:', err.stack);
  res.status(500).json({ 
    error: 'שגיאה בשרת', 
    message: err.message 
  });
});

/**
 * 404 Handler - טיפול בנתיבים לא קיימים
 * זה רץ כשהמשתמש מנסה להגיע לנתיב שלא קיים
 */
app.use((req, res) => {
  res.status(404).json({ 
    error: 'הנתיב לא נמצא',
    requestedPath: req.path 
  });
});

/**
 * הפעלת השרת - Server Listening
 * השרת מתחיל להאזין לבקשות על הפורט שהוגדר
 */
app.listen(PORT, () => {
  console.log(`🚀 השרת רץ על פורט ${PORT}`);
  console.log(`📍 כתובת: http://localhost:${PORT}`);
  console.log(`🔗 נתיבי API זמינים:`);
  console.log(`   - POST http://localhost:${PORT}/api/auth/register`);
  console.log(`   - POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   - POST http://localhost:${PORT}/api/auth/logout`);
  console.log(`   - GET http://localhost:${PORT}/api/properties`);
  console.log(`   - POST http://localhost:${PORT}/api/properties`);
  console.log(`   - PUT http://localhost:${PORT}/api/properties/:id`);
  console.log(`   - DELETE http://localhost:${PORT}/api/properties/:id`);
  console.log(`   - GET http://localhost:${PORT}/api/users/me`);
  console.log(`   - PUT http://localhost:${PORT}/api/users/me`);
  console.log(`   - DELETE http://localhost:${PORT}/api/users/me`);
});

export default app;
