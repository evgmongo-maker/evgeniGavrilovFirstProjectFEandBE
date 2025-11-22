# 📮 מדריך Postman - API Testing

מדריך מלא לבדיקת כל ה-API endpoints של השרת עם Postman.

## 📋 תוכן עניינים

1. [הגדרות בסיסיות](#הגדרות-בסיסיות)
2. [Authentication Endpoints](#authentication-endpoints)
3. [Properties Endpoints](#properties-endpoints)
4. [דוגמאות בקשות](#דוגמאות-בקשות)
5. [טיפול בשגיאות](#טיפול-בשגיאות)

---

## 🔧 הגדרות בסיסיות

### Base URL
```
http://localhost:5000
```

### Headers נדרשים
לכל הבקשות (חוץ מ-Authentication):
```
Authorization: Bearer <YOUR_TOKEN>
Content-Type: application/json
```

### איך לקבל Token?
1. הרשמה או התחברות דרך `/api/auth/register` או `/api/auth/login`
2. העתק את ה-`token` מהתגובה
3. הוסף אותו ל-Header: `Authorization: Bearer <token>`

---

## 🔐 Authentication Endpoints

### 1. הרשמה - POST /api/auth/register

**URL:** `http://localhost:5000/api/auth/register`

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "יוסי כהן",
  "email": "yossi@example.com",
  "password": "password123"
}
```

**תגובה מוצלחת (201):**
```json
{
  "message": "משתמש נרשם בהצלחה!",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "יוסי כהן",
    "email": "yossi@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**שגיאות אפשריות:**
- `400` - שדות חסרים או לא תקינים
- `409` - אימייל כבר קיים
- `500` - שגיאת שרת

---

### 2. התחברות - POST /api/auth/login

**URL:** `http://localhost:5000/api/auth/login`

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "yossi@example.com",
  "password": "password123"
}
```

**תגובה מוצלחת (200):**
```json
{
  "message": "התחברות בוצעה בהצלחה!",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "יוסי כהן",
    "email": "yossi@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**שגיאות אפשריות:**
- `400` - שדות חסרים
- `401` - אימייל או סיסמה שגויים
- `500` - שגיאת שרת

---

### 3. התנתקות - POST /api/auth/logout

**URL:** `http://localhost:5000/api/auth/logout`

**Method:** `POST`

**Headers:** (לא נדרש)

**תגובה מוצלחת (200):**
```json
{
  "message": "התנתקת בהצלחה"
}
```

---

## 🏠 Properties Endpoints

**⚠️ חשוב:** כל ה-endpoints הבאים דורשים Authentication token!

### 1. קבלת כל הנכסים - GET /api/properties

**URL:** `http://localhost:5000/api/properties`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer <YOUR_TOKEN>
```

**תגובה מוצלחת (200):**
```json
{
  "count": 2,
  "properties": [
    {
      "id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "title": "דירת 4 חדרים בתל אביב",
      "price": 2500000,
      "location": "תל אביב",
      "description": "דירה מרווחת במיקום מעולה",
      "status": "זמין",
      "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}
```

**שגיאות אפשריות:**
- `401` - לא מורשה (אין token או token לא תקין)
- `500` - שגיאת שרת

---

### 2. הוספת נכס חדש - POST /api/properties

**URL:** `http://localhost:5000/api/properties`

**Method:** `POST`

**Headers:**
```
Authorization: Bearer <YOUR_TOKEN>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "דירת 3 חדרים בירושלים",
  "price": 1800000,
  "location": "ירושלים, קטמון",
  "description": "דירה יפה וחדשה עם נוף",
  "status": "זמין"
}
```

**תגובה מוצלחת (201):**
```json
{
  "message": "נכס נוסף בהצלחה",
  "property": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "דירת 3 חדרים בירושלים",
    "price": 1800000,
    "location": "ירושלים, קטמון",
    "description": "דירה יפה וחדשה עם נוף",
    "status": "זמין",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "createdAt": "2025-01-15T11:00:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
}
```

**שדות חובה:**
- `title` - כותרת הנכס
- `price` - מחיר (מספר חיובי)
- `location` - מיקום

**שדות אופציונליים:**
- `description` - תיאור
- `status` - סטטוס (`"זמין"` או `"נמכר"`, ברירת מחדל: `"זמין"`)

**שגיאות אפשריות:**
- `400` - שדות חסרים או לא תקינים
- `401` - לא מורשה
- `500` - שגיאת שרת

---

### 3. עדכון נכס - PUT /api/properties/:id

**URL:** `http://localhost:5000/api/properties/{property_id}`

**Method:** `PUT`

**Headers:**
```
Authorization: Bearer <YOUR_TOKEN>
Content-Type: application/json
```

**Parameters:**
- `id` - מזהה הנכס (MongoDB ObjectId)

**Body (JSON) - כל השדות אופציונליים:**
```json
{
  "title": "דירת 3 חדרים בירושלים - מעודכן",
  "price": 1900000,
  "status": "נמכר"
}
```

**תגובה מוצלחת (200):**
```json
{
  "message": "נכס עודכן בהצלחה",
  "property": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "דירת 3 חדרים בירושלים - מעודכן",
    "price": 1900000,
    "location": "ירושלים, קטמון",
    "description": "דירה יפה וחדשה עם נוף",
    "status": "נמכר",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "createdAt": "2025-01-15T11:00:00.000Z",
    "updatedAt": "2025-01-15T12:00:00.000Z"
  }
}
```

**שגיאות אפשריות:**
- `400` - שדות לא תקינים או מזהה לא תקין
- `401` - לא מורשה
- `403` - אין הרשאה (הנכס לא שייך למשתמש)
- `404` - נכס לא נמצא
- `500` - שגיאת שרת

---

### 4. מחיקת נכס - DELETE /api/properties/:id

**URL:** `http://localhost:5000/api/properties/{property_id}`

**Method:** `DELETE`

**Headers:**
```
Authorization: Bearer <YOUR_TOKEN>
```

**Parameters:**
- `id` - מזהה הנכס (MongoDB ObjectId)

**תגובה מוצלחת (200):**
```json
{
  "message": "נכס נמחק בהצלחה",
  "property": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "דירת 3 חדרים בירושלים - מעודכן",
    "price": 1900000,
    "location": "ירושלים, קטמון"
  }
}
```

**שגיאות אפשריות:**
- `400` - מזהה לא תקין
- `401` - לא מורשה
- `403` - אין הרשאה (הנכס לא שייך למשתמש)
- `404` - נכס לא נמצא
- `500` - שגיאת שרת

---

## 📝 דוגמאות בקשות

### תרחיש מלא - מהרשמה עד מחיקת נכס

#### שלב 1: הרשמה
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "דני לוי",
  "email": "dani@example.com",
  "password": "mypassword123"
}
```

**שמור את ה-token מהתגובה!**

#### שלב 2: הוספת נכס
```http
POST http://localhost:5000/api/properties
Authorization: Bearer <TOKEN_FROM_STEP_1>
Content-Type: application/json

{
  "title": "וילה 5 חדרים בהרצליה",
  "price": 5000000,
  "location": "הרצליה פיתוח",
  "description": "וילה מפוארת עם בריכה",
  "status": "זמין"
}
```

**שמור את ה-ID של הנכס מהתגובה!**

#### שלב 3: קבלת כל הנכסים
```http
GET http://localhost:5000/api/properties
Authorization: Bearer <TOKEN_FROM_STEP_1>
```

#### שלב 4: עדכון נכס
```http
PUT http://localhost:5000/api/properties/<PROPERTY_ID_FROM_STEP_2>
Authorization: Bearer <TOKEN_FROM_STEP_1>
Content-Type: application/json

{
  "price": 5200000,
  "status": "נמכר"
}
```

#### שלב 5: מחיקת נכס
```http
DELETE http://localhost:5000/api/properties/<PROPERTY_ID_FROM_STEP_2>
Authorization: Bearer <TOKEN_FROM_STEP_1>
```

---

## ⚠️ טיפול בשגיאות

### קודי Status נפוצים:

- **200** - הצלחה
- **201** - נוצר בהצלחה
- **400** - בקשה שגויה (validation error)
- **401** - לא מורשה (אין token או token לא תקין)
- **403** - אסור (אין הרשאה לפעולה)
- **404** - לא נמצא
- **409** - קונפליקט (למשל - אימייל כבר קיים)
- **500** - שגיאת שרת

### דוגמאות לשגיאות:

#### שגיאת Validation (400)
```json
{
  "error": "חסרים שדות חובה",
  "message": "נא למלא כותרת, מחיר ומיקום"
}
```

#### שגיאת Authentication (401)
```json
{
  "error": "לא מורשה",
  "message": "אין token אימות. אנא התחבר תחילה."
}
```

#### שגיאת Authorization (403)
```json
{
  "error": "אין הרשאה",
  "message": "אין לך הרשאה לערוך נכס זה"
}
```

#### שגיאת Not Found (404)
```json
{
  "error": "נכס לא נמצא",
  "message": "הנכס המבוקש אינו קיים במערכת"
}
```

---

## 🚀 טיפים לשימוש ב-Postman

### 1. יצירת Environment
צור Environment חדש עם המשתנים:
- `base_url`: `http://localhost:5000`
- `token`: (יתעדכן אוטומטית אחרי התחברות)

### 2. שימוש ב-Variables
בכל בקשה, השתמש ב:
```
{{base_url}}/api/properties
Authorization: Bearer {{token}}
```

### 3. Tests אוטומטיים
הוסף Tests ב-Postman לשמירת token אוטומטית:

**ב-/api/auth/login או /register:**
```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
    const jsonData = pm.response.json();
    pm.environment.set("token", jsonData.token);
}
```

### 4. Pre-request Script
להוספת token אוטומטי לכל בקשה:
```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

---

## 📦 Postman Collection

ניתן לייבא את הקובץ `Postman_Collection.json` (אם קיים) ל-Postman לקבלת כל ה-endpoints מוכנים מראש.

---

## ✅ Checklist לבדיקה

- [ ] השרת רץ על פורט 5000
- [ ] MongoDB מחובר ופועל
- [ ] הרשמה עובדת
- [ ] התחברות עובדת
- [ ] קבלת נכסים עובדת (דורש token)
- [ ] הוספת נכס עובדת (דורש token)
- [ ] עדכון נכס עובד (דורש token + בעלות)
- [ ] מחיקת נכס עובדת (דורש token + בעלות)
- [ ] שגיאות מחזירות קודים נכונים
- [ ] Validation עובד על כל השדות

---

**🎉 בהצלחה בבדיקות!**

לשאלות או בעיות, בדוק את ה-logs של השרת או את ה-README.md

