# 🧪 בדיקת הרשמה ו-MongoDB

## ✅ איך לבדוק שההרשמה עובדת ו-MongoDB שומר את המשתמשים

### שלב 1: הפעל את השרת

```bash
cd firstProject-serverSide
npm start
# או למצב פיתוח:
npm run dev
```

**ודא שאתה רואה:**
```
✅ MongoDB מחובר בהצלחה!
📊 מסד נתונים: realestateDB
🚀 השרת רץ על פורט 5000
```

### שלב 2: הרשמה דרך Postman

#### אפשרות א': Postman

1. פתח Postman
2. בחר `POST /api/auth/register`
3. הוסף Body (JSON):
```json
{
  "name": "יוסי כהן",
  "email": "yossi@test.com",
  "password": "password123"
}
```
4. שלח את הבקשה
5. אתה אמור לקבל תגובה:
```json
{
  "message": "משתמש נרשם בהצלחה!",
  "user": {
    "id": "...",
    "name": "יוסי כהן",
    "email": "yossi@test.com"
  },
  "token": "..."
}
```

#### אפשרות ב': דרך הדפדפן/האפליקציה

1. פתח את האפליקציה (Frontend)
2. לך לדף הרשמה
3. מלא את הטופס:
   - שם: יוסי כהן
   - אימייל: yossi@test.com
   - סיסמה: password123
4. לחץ על הרשמה

### שלב 3: בדיקה ב-MongoDB Compass

1. **פתח MongoDB Compass**
2. **התחבר ל-Cluster שלך:**
   - Connection String: `mongodb+srv://evgmongo:q25ufdt2BgsNThLT@cluster0.jheehg9.mongodb.net/`
3. **נווט למסד הנתונים:**
   - לחץ על `realestateDB` (אם לא רואה, רענן את הרשימה)
4. **מצא את ה-Collection:**
   - לחץ על `users` (Collection של המשתמשים)
5. **צפה במשתמשים:**
   - אתה אמור לראות את כל המשתמשים שנרשמו
   - כל משתמש יכלול:
     - `_id` - מזהה ייחודי
     - `name` - שם המשתמש
     - `email` - אימייל (ייחודי)
     - `password` - סיסמה מוצפנת (bcrypt hash)
     - `createdAt` - תאריך יצירה
     - `updatedAt` - תאריך עדכון אחרון

### 📋 דוגמה למסמך במסד הנתונים:

```json
{
  "_id": ObjectId("65a1b2c3d4e5f6g7h8i9j0k1"),
  "name": "יוסי כהן",
  "email": "yossi@test.com",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "createdAt": ISODate("2025-01-15T10:00:00.000Z"),
  "updatedAt": ISODate("2025-01-15T10:00:00.000Z")
}
```

### 🔍 מה לבדוק:

✅ **המשתמש נשמר:**
- האם אתה רואה את המשתמש החדש ב-Collection `users`?

✅ **הסיסמה מוצפנת:**
- הסיסמה אמורה להיות hash ארוך שמתחיל ב-`$2a$10$`
- **לא** אמור להיות טקסט רגיל!

✅ **שדות נכונים:**
- `name` - שם המשתמש
- `email` - אימייל (lowercase)
- `password` - hash מוצפן
- `createdAt` ו-`updatedAt` - timestamps

✅ **ייחודיות אימייל:**
- נסה לרשום משתמש נוסף עם אותו אימייל
- אתה אמור לקבל שגיאה: `"משתמש כבר קיים"`

### 🧪 בדיקות נוספות:

#### בדיקה 1: הרשמה עם אימייל קיים
```json
POST /api/auth/register
{
  "name": "משתמש אחר",
  "email": "yossi@test.com",  // אותו אימייל
  "password": "password456"
}
```
**תגובה צפויה:** `409 - משתמש כבר קיים`

#### בדיקה 2: התחברות עם המשתמש שנרשם
```json
POST /api/auth/login
{
  "email": "yossi@test.com",
  "password": "password123"
}
```
**תגובה צפויה:** `200 - התחברות בוצעה בהצלחה!` + token

#### בדיקה 3: רשימת כל המשתמשים (Debug)
```json
GET /api/auth/users
```
**תגובה:** רשימת כל המשתמשים (ללא סיסמאות)

### ⚠️ בעיות נפוצות:

#### 1. לא רואה את המשתמש ב-MongoDB Compass:
- **פתרון:** רענן את הרשימה (F5)
- ודא שאתה מחובר למסד הנתונים הנכון (`realestateDB`)
- ודא שהשרת רץ והתחבר בהצלחה

#### 2. שגיאת "MongoServerError: E11000 duplicate key error":
- זה אומר שהאימייל כבר קיים
- נסה עם אימייל אחר

#### 3. המשתמש לא נשמר:
- בדוק את ה-logs של השרת
- ודא שהחיבור ל-MongoDB עובד
- בדוק שאין שגיאות ב-console

### 📊 Collection Structure:

ב-MongoDB Compass, אתה אמור לראות:

```
realestateDB/
├── users/          ← כל המשתמשים כאן
│   ├── יוסי כהן
│   ├── משתמש אחר
│   └── ...
└── properties/     ← כל הנכסים כאן (אחרי שתצור נכסים)
    ├── נכס 1
    └── ...
```

### ✅ Checklist:

- [ ] השרת רץ ומחובר ל-MongoDB
- [ ] ביצעת הרשמה דרך Postman או האפליקציה
- [ ] קיבלת תגובה מוצלחת (201)
- [ ] פתחת MongoDB Compass
- [ ] התחברת ל-Cluster
- [ ] מצאת את מסד הנתונים `realestateDB`
- [ ] פתחת את ה-Collection `users`
- [ ] רואה את המשתמש החדש ברשימה
- [ ] הסיסמה מוצפנת (hash)
- [ ] כל השדות נכונים

---

**🎉 אם הכל עובד, המשתמשים נשמרים ב-MongoDB ויופיעו ב-Collection `users`!**

