# 🏠 נכסים בישראל - Server Side (Backend)

שרת צד (Backend) למערכת ניהול נכסי נדל"ן בישראל

**👨‍💻 פותח על ידי: evgmongo-maker**

## תיאור הפרויקט

שרת Node.js + Express עם API מלא לניהול משתמשים ונכסים. השרת משתמש באחסון זמני בזיכרון (בלי מסד נתונים) ומספק אימות משתמשים עם JWT.

## טכנולוגיות

- **Node.js** - סביבת ריצה
- **Express** - Framework לשרת
- **JWT** - אימות משתמשים
- **bcryptjs** - הצפנת סיסמאות
- **CORS** - תמיכה בבקשות מהצד לקוח
- **dotenv** - ניהול משתני סביבה

## מבנה הפרויקט

```
firstProject-serverSide/
├── routes/
│   ├── auth.js           # נתיבי אימות (הרשמה/התחברות)
│   └── properties.js     # נתיבי ניהול נכסים (CRUD)
├── middleware/
│   └── authMiddleware.js # בדיקת אימות משתמשים
├── server.js             # קובץ ראשי - נקודת כניסה
├── .env                  # משתני סביבה
├── .gitignore            # קבצים להתעלמות ב-Git
├── package.json          # תלויות ופקודות
└── README.md             # תיעוד
```

## התקנה והרצה

### דרישות מקדימות
- Node.js 18+
- npm או yarn

### הוראות התקנה

1. **התקנת dependencies**
   ```bash
   npm install
   ```

2. **הגדרת משתני סביבה**
   - הקובץ `.env` כבר קיים עם ערכי ברירת מחדל
   - בפרודקשן אמיתי, יש לשנות את `JWT_SECRET` למחרוזת מורכבת

3. **הרצת השרת**
   ```bash
   # הרצה רגילה
   npm start

   # הרצה עם nodemon (מתאים לפיתוח)
   npm run dev
   ```

4. **השרת רץ על**
   ```
   http://localhost:5000
   ```

## API Endpoints

### Authentication (אימות)

#### הרשמה
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "שם משתמש",
  "email": "user@example.com",
  "password": "password123"
}
```

**תגובה מוצלחת (201):**
```json
{
  "message": "הרשמה הושלמה בהצלחה",
  "user": {
    "id": "1234567890",
    "name": "שם משתמש",
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### התחברות
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**תגובה מוצלחת (200):**
```json
{
  "message": "התחברות הצליחה",
  "user": {
    "id": "1234567890",
    "name": "שם משתמש",
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### התנתקות
```http
POST /api/auth/logout
```

### Properties (נכסים)

**הערה: כל הבקשות דורשות Authentication header:**
```
Authorization: Bearer <token>
```

#### קבלת כל הנכסים
```http
GET /api/properties
Authorization: Bearer <token>
```

**תגובה מוצלחת (200):**
```json
{
  "count": 2,
  "properties": [
    {
      "id": "1",
      "title": "דירת 4 חדרים בתל אביב",
      "price": 2500000,
      "location": "תל אביב",
      "description": "דירה מרווחת במיקום מעולה",
      "status": "זמין",
      "userId": "1234567890",
      "createdAt": "2025-11-05T10:00:00.000Z",
      "updatedAt": "2025-11-05T10:00:00.000Z"
    }
  ]
}
```

#### הוספת נכס חדש
```http
POST /api/properties
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "דירת 3 חדרים בירושלים",
  "price": 1800000,
  "location": "ירושלים",
  "description": "דירה יפה וחדשה",
  "status": "זמין"
}
```

#### עדכון נכס
```http
PUT /api/properties/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "דירת 3 חדרים בירושלים - מעודכן",
  "price": 1900000,
  "status": "נמכר"
}
```

#### מחיקת נכס
```http
DELETE /api/properties/:id
Authorization: Bearer <token>
```

## אבטחה

### JWT Authentication
- כל המשתמשים מקבלים token לאחר הרשמה/התחברות
- ה-token תקף ל-24 שעות
- צריך לשלוח את ה-token בכותרת `Authorization: Bearer <token>`

### הצפנת סיסמאות
- כל הסיסמאות מוצפנות עם bcrypt
- הסיסמאות לא נשמרות בטקסט גלוי

### CORS
- השרת מאפשר בקשות רק מ-`http://localhost:5174` (הצד לקוח)
- ניתן לשנות זאת בקובץ `.env`

## אחסון בזיכרון

**חשוב:** המידע נשמר בזיכרון בלבד!
- כשהשרת נכבה, כל המידע נמחק
- זה מתאים ל-MVP ולפיתוח בלבד
- בפרודקשן אמיתי צריך להוסיף מסד נתונים (MongoDB, PostgreSQL, וכו')

## טיפול בשגיאות

השרת מחזיר קודי status HTTP סטנדרטיים:

- `200` - הצלחה
- `201` - נוצר בהצלחה
- `400` - בקשה שגויה (validation error)
- `401` - לא מורשה (אין token או token לא תקין)
- `403` - אסור (אין הרשאה לפעולה)
- `404` - לא נמצא
- `409` - קונפליקט (למשל - אימייל כבר קיים)
- `500` - שגיאת שרת

## דוגמאות שימוש

### JavaScript (Fetch API)

```javascript
// הרשמה
const register = async () => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'שם משתמש',
      email: 'user@example.com',
      password: 'password123'
    })
  });
  const data = await response.json();
  // שמירת ה-token
  localStorage.setItem('token', data.token);
};

// קבלת נכסים
const getProperties = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/properties', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data.properties;
};
```

## בדיקת השרת

### בדיקה בסיסית
```bash
# בדיקה שהשרת רץ
curl http://localhost:5000

# תגובה צפויה:
{
  "message": "ברוך הבא לשרת ניהול נכסים בישראל",
  "status": "Server is running"
}
```

### בדיקה עם Postman/Insomnia
1. יבוא ה-endpoints מהתיעוד למעלה
2. התחל עם הרשמה/התחברות
3. העתק את ה-token שהתקבל
4. הוסף אותו ל-Authorization header בבקשות האחרות

## פיתוח והרחבה

### הוספת MongoDB (אופציונלי)
```bash
npm install mongoose
```

### הוספת Validation מתקדם
```bash
npm install joi express-validator
```

### הוספת Rate Limiting (הגנה מפני spam)
```bash
npm install express-rate-limit
```

## רישוי

ISC License - חופשי לשימוש לצרכי לימוד

## יוצר

**evgmongo-maker**  
פרויקט לימודי - מערכת ניהול נדל"ן בישראל

---

**הערה:** זהו פרויקט לימודי ב-MVP. לשימוש בפרודקשן אמיתי יש להוסיף:
- מסד נתונים קבוע
- אבטחה מתקדמת יותר
- Logging מסודר
- Rate limiting
- Input validation מקיף יותר
- Tests (unit & integration)
