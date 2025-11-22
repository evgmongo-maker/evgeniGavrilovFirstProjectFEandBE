# 📮 מדריך Postman - צעד אחר צעד

## 🚀 התחלה מהירה

### שלב 1: הפעל את השרת

```bash
cd firstProject-serverSide
npm start
```

**ודא שאתה רואה:**
```
✅ MongoDB מחובר בהצלחה!
📊 מסד נתונים: realestateDB
🚀 השרת רץ על פורט 5000
```

### שלב 2: פתח Postman

1. פתח את Postman
2. צור Workspace חדש (אופציונלי)
3. ייבא את הקובץ `Postman_Collection.json` (אם יש)

---

## 🔐 שלב 1: Authentication - הרשמה והתחברות

### 1.1 הרשמה - יצירת משתמש חדש

#### בקשה:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "יוסי כהן",
    "email": "yossi@test.com",
    "password": "password123"
  }
  ```

#### מה לבדוק:
1. **Status Code:** אמור להיות `201 Created`
2. **Response Body:** אמור להכיל:
   ```json
   {
     "message": "משתמש נרשם בהצלחה!",
     "user": {
       "id": "...",
       "name": "יוסי כהן",
       "email": "yossi@test.com"
     },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```
3. **שמור את ה-token!** - תצטרך אותו לבדיקות הבאות

#### בדיקות נוספות:
- **נסה לרשום שוב עם אותו אימייל** → אמור לקבל `409 Conflict`
- **נסה בלי שם** → אמור לקבל `400 Bad Request`
- **נסה עם סיסמה קצרה** → אמור לקבל `400 Bad Request`

---

### 1.2 התחברות - Login

#### בקשה:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "yossi@test.com",
    "password": "password123"
  }
  ```

#### מה לבדוק:
1. **Status Code:** אמור להיות `200 OK`
2. **Response Body:** אמור להכיל token חדש
3. **שמור את ה-token!**

#### בדיקות נוספות:
- **נסה עם סיסמה שגויה** → אמור לקבל `401 Unauthorized`
- **נסה עם אימייל שלא קיים** → אמור לקבל `401 Unauthorized`

---

### 1.3 בדיקה שהמשתמש נשמר ב-MongoDB

1. פתח **MongoDB Compass**
2. התחבר ל-Cluster שלך
3. פתח את מסד הנתונים `realestateDB`
4. פתח את ה-Collection `users`
5. **אתה אמור לראות את המשתמש שנרשם!**

---

## 🏠 שלב 2: Properties - ניהול נכסים

**⚠️ חשוב:** כל הבקשות הבאות דורשות token!

### 2.1 קבלת כל הנכסים - GET

#### בקשה:
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/properties`
- **Headers:**
  ```
  Authorization: Bearer <YOUR_TOKEN>
  ```
  (החלף `<YOUR_TOKEN>` ב-token שקיבלת מההתחברות)

#### מה לבדוק:
1. **Status Code:** אמור להיות `200 OK`
2. **Response Body:** אמור להכיל:
   ```json
   {
     "count": 0,
     "properties": []
   }
   ```
   (אם אין נכסים עדיין, הרשימה תהיה ריקה)

#### בדיקות נוספות:
- **נסה בלי token** → אמור לקבל `401 Unauthorized`
- **נסה עם token לא תקין** → אמור לקבל `401 Unauthorized`

---

### 2.2 הוספת נכס חדש - POST

#### בקשה:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/properties`
- **Headers:**
  ```
  Authorization: Bearer <YOUR_TOKEN>
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "title": "דירת 4 חדרים בתל אביב",
    "price": 2500000,
    "location": "תל אביב, רמת אביב",
    "description": "דירה מרווחת במיקום מעולה",
    "status": "זמין"
  }
  ```

#### מה לבדוק:
1. **Status Code:** אמור להיות `201 Created`
2. **Response Body:** אמור להכיל:
   ```json
   {
     "message": "נכס נוסף בהצלחה",
     "property": {
       "id": "...",
       "title": "דירת 4 חדרים בתל אביב",
       "price": 2500000,
       "location": "תל אביב, רמת אביב",
       "description": "דירה מרווחת במיקום מעולה",
       "status": "זמין",
       "userId": "...",
       "createdAt": "...",
       "updatedAt": "..."
     }
   }
   ```
3. **שמור את ה-ID של הנכס!** - תצטרך אותו לעריכה ומחיקה

#### בדיקות נוספות:
- **נסה בלי title** → אמור לקבל `400 Bad Request`
- **נסה עם מחיר שלילי** → אמור לקבל `400 Bad Request`
- **נסה עם סטטוס לא תקין** → אמור לקבל `400 Bad Request`

#### בדיקה ב-MongoDB:
1. פתח MongoDB Compass
2. פתח את `realestateDB` → `properties`
3. **אתה אמור לראות את הנכס החדש!**

---

### 2.3 קבלת כל הנכסים שוב - GET

#### בקשה:
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/properties`
- **Headers:**
  ```
  Authorization: Bearer <YOUR_TOKEN>
  ```

#### מה לבדוק:
1. **Status Code:** `200 OK`
2. **Response Body:** אמור להכיל את הנכס שיצרת:
   ```json
   {
     "count": 1,
     "properties": [
       {
         "id": "...",
         "title": "דירת 4 חדרים בתל אביב",
         ...
       }
     ]
   }
   ```

---

### 2.4 עדכון נכס - PUT

#### בקשה:
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/properties/<PROPERTY_ID>`
  (החלף `<PROPERTY_ID>` ב-ID של הנכס שיצרת)
- **Headers:**
  ```
  Authorization: Bearer <YOUR_TOKEN>
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "title": "דירת 4 חדרים בתל אביב - מעודכן",
    "price": 2700000,
    "status": "נמכר"
  }
  ```

#### מה לבדוק:
1. **Status Code:** אמור להיות `200 OK`
2. **Response Body:** אמור להכיל את הנכס המעודכן:
   ```json
   {
     "message": "נכס עודכן בהצלחה",
     "property": {
       "id": "...",
       "title": "דירת 4 חדרים בתל אביב - מעודכן",
       "price": 2700000,
       "status": "נמכר",
       ...
     }
   }
   ```

#### בדיקות נוספות:
- **נסה לעדכן נכס שלא קיים** → אמור לקבל `404 Not Found`
- **נסה לעדכן נכס של משתמש אחר** → אמור לקבל `403 Forbidden`

---

### 2.5 מחיקת נכס - DELETE

#### בקשה:
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/properties/<PROPERTY_ID>`
  (החלף `<PROPERTY_ID>` ב-ID של הנכס)
- **Headers:**
  ```
  Authorization: Bearer <YOUR_TOKEN>
  ```

#### מה לבדוק:
1. **Status Code:** אמור להיות `200 OK`
2. **Response Body:** אמור להכיל:
   ```json
   {
     "message": "נכס נמחק בהצלחה",
     "property": {
       "id": "...",
       "title": "...",
       ...
     }
   }
   ```

#### בדיקה:
- **נסה לקבל את הנכס שוב** → אמור לקבל רשימה ריקה או נכס אחר

---

## 🧪 תרחיש בדיקה מלא

### תרחיש 1: משתמש חדש - מההתחלה

1. **הרשמה:**
   ```
   POST http://localhost:5000/api/auth/register
   Body: { "name": "דני לוי", "email": "dani@test.com", "password": "pass123" }
   ```
   → שמור את ה-token

2. **הוספת נכס:**
   ```
   POST http://localhost:5000/api/properties
   Headers: Authorization: Bearer <TOKEN>
   Body: { "title": "וילה בהרצליה", "price": 5000000, "location": "הרצליה" }
   ```
   → שמור את ה-ID של הנכס

3. **קבלת כל הנכסים:**
   ```
   GET http://localhost:5000/api/properties
   Headers: Authorization: Bearer <TOKEN>
   ```
   → אמור להחזיר את הנכס שיצרת

4. **עדכון הנכס:**
   ```
   PUT http://localhost:5000/api/properties/<ID>
   Headers: Authorization: Bearer <TOKEN>
   Body: { "price": 5200000, "status": "נמכר" }
   ```

5. **מחיקת הנכס:**
   ```
   DELETE http://localhost:5000/api/properties/<ID>
   Headers: Authorization: Bearer <TOKEN>
   ```

---

## 🔍 בדיקת תקינות השרת

### בדיקה 1: השרת רץ

#### בקשה:
- **Method:** `GET`
- **URL:** `http://localhost:5000/`

#### תגובה צפויה:
```json
{
  "message": "ברוך הבא לשרת ניהול נכסים בישראל",
  "status": "Server is running",
  "endpoints": {
    "auth": "/api/auth (register, login, logout)",
    "properties": "/api/properties (CRUD operations)"
  }
}
```

**אם אתה מקבל תגובה זו → השרת רץ! ✅**

---

### בדיקה 2: MongoDB מחובר

#### איך לבדוק:
1. **בדוק את ה-console של השרת:**
   ```
   ✅ MongoDB מחובר בהצלחה!
   📊 מסד נתונים: realestateDB
   ```
   → אם אתה רואה זאת, MongoDB מחובר! ✅

2. **נסה לבצע הרשמה:**
   - אם ההרשמה מצליחה → MongoDB עובד ✅
   - אם יש שגיאה → בדוק את ה-connection string

---

### בדיקה 3: Authentication עובד

#### בדיקה:
1. **הרשמה** → אמור לקבל token
2. **התחברות** → אמור לקבל token
3. **שימוש ב-token** → אמור לעבוד

**אם כל זה עובד → Authentication תקין! ✅**

---

### בדיקה 4: CRUD עובד

#### בדיקה:
1. **Create (POST)** → הוספת נכס → אמור לעבוד ✅
2. **Read (GET)** → קבלת נכסים → אמור להחזיר את הנכס ✅
3. **Update (PUT)** → עדכון נכס → אמור לעבוד ✅
4. **Delete (DELETE)** → מחיקת נכס → אמור לעבוד ✅

**אם כל זה עובד → CRUD תקין! ✅**

---

## 📋 Checklist לבדיקה

### Authentication ✅
- [ ] הרשמה עובדת
- [ ] התחברות עובדת
- [ ] המשתמש נשמר ב-MongoDB
- [ ] Token נשמר ומשמש

### Properties CRUD ✅
- [ ] GET - קבלת נכסים עובדת
- [ ] POST - הוספת נכס עובדת
- [ ] הנכס נשמר ב-MongoDB
- [ ] PUT - עדכון נכס עובדת
- [ ] DELETE - מחיקת נכס עובדת

### אבטחה ✅
- [ ] בקשות ללא token נדחות (401)
- [ ] בקשות עם token לא תקין נדחות (401)
- [ ] משתמש לא יכול לערוך נכס של משתמש אחר (403)

### MongoDB ✅
- [ ] המשתמשים נשמרים ב-Collection `users`
- [ ] הנכסים נשמרים ב-Collection `properties`
- [ ] הנתונים נשארים אחרי restart השרת

---

## 🎯 טיפים לשימוש ב-Postman

### 1. יצירת Environment

צור Environment חדש עם משתנים:
- `base_url` = `http://localhost:5000`
- `token` = (יתעדכן אוטומטית)

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
    pm.environment.set("user_id", jsonData.user.id);
}
```

### 4. Pre-request Script

להוספת token אוטומטי לכל בקשה:
```javascript
const token = pm.environment.get("token");
if (token) {
    pm.request.headers.add({
        key: 'Authorization',
        value: 'Bearer ' + token
    });
}
```

---

## ⚠️ בעיות נפוצות ופתרונות

### בעיה 1: "Cannot GET /"
**פתרון:** השרת לא רץ או רץ על פורט אחר

### בעיה 2: "401 Unauthorized"
**פתרון:** 
- ודא שיש token ב-Header
- ודא שה-token תקין ולא פג תוקף
- נסה להתחבר מחדש

### בעיה 3: "MongoServerError: E11000 duplicate key"
**פתרון:** האימייל כבר קיים, נסה עם אימייל אחר

### בעיה 4: "404 Not Found"
**פתרון:** 
- ודא שה-URL נכון
- ודא שה-ID של הנכס תקין

### בעיה 5: "403 Forbidden"
**פתרון:** הנכס שייך למשתמש אחר, התחבר עם המשתמש הנכון

---

## 🎉 סיכום

אחרי שתעבור על כל הבדיקות האלה, תוודא שהשרת עובד במלואו!

**הכל מוכן לבדיקה!** 🚀

