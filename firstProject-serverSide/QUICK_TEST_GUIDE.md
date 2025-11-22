# ⚡ מדריך מהיר - בדיקת השרת ב-Postman

## 🚀 התחלה מהירה (5 דקות)

### שלב 1: הפעל את השרת

```bash
cd firstProject-serverSide
npm start
```

**ודא שאתה רואה:**
```
✅ MongoDB מחובר בהצלחה!
🚀 השרת רץ על פורט 5000
```

---

## 📋 סדר הבדיקות (מומלץ)

### 1️⃣ בדיקה שהשרת רץ

**בקשה:**
- **Method:** `GET`
- **URL:** `http://localhost:5000/`

**תגובה צפויה:**
```json
{
  "message": "ברוך הבא לשרת ניהול נכסים בישראל"
}
```

✅ **אם אתה מקבל תגובה → השרת רץ!**

---

### 2️⃣ הרשמה - יצירת משתמש

**בקשה:**
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

**מה לבדוק:**
- ✅ Status: `201 Created`
- ✅ Response כולל `token`
- ✅ Response כולל `user` עם `id`, `name`, `email`

**⚠️ חשוב:** העתק את ה-`token` - תצטרך אותו לבדיקות הבאות!

---

### 3️⃣ התחברות - Login

**בקשה:**
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

**מה לבדוק:**
- ✅ Status: `200 OK`
- ✅ Response כולל `token`
- ✅ Response כולל `user`

**⚠️ חשוב:** העתק את ה-`token` החדש!

---

### 4️⃣ הוספת נכס - CREATE

**בקשה:**
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/properties`
- **Headers:**
  ```
  Authorization: Bearer <YOUR_TOKEN>
  Content-Type: application/json
  ```
  (החלף `<YOUR_TOKEN>` ב-token שקיבלת)

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

**מה לבדוק:**
- ✅ Status: `201 Created`
- ✅ Response כולל `property` עם `id`
- ✅ כל השדות נשמרו נכון

**⚠️ חשוב:** העתק את ה-`id` של הנכס - תצטרך אותו לעריכה ומחיקה!

---

### 5️⃣ קבלת כל הנכסים - READ

**בקשה:**
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/properties`
- **Headers:**
  ```
  Authorization: Bearer <YOUR_TOKEN>
  ```

**מה לבדוק:**
- ✅ Status: `200 OK`
- ✅ Response כולל `count` ו-`properties`
- ✅ הנכס שיצרת נמצא ברשימה

---

### 6️⃣ עדכון נכס - UPDATE

**בקשה:**
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/properties/<PROPERTY_ID>`
  (החלף `<PROPERTY_ID>` ב-ID של הנכס)
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

**מה לבדוק:**
- ✅ Status: `200 OK`
- ✅ Response כולל את הנכס המעודכן
- ✅ השדות עודכנו נכון

---

### 7️⃣ מחיקת נכס - DELETE

**בקשה:**
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/properties/<PROPERTY_ID>`
  (החלף `<PROPERTY_ID>` ב-ID של הנכס)
- **Headers:**
  ```
  Authorization: Bearer <YOUR_TOKEN>
  ```

**מה לבדוק:**
- ✅ Status: `200 OK`
- ✅ Response כולל הודעת הצלחה

**בדיקה נוספת:**
- נסה לקבל את הנכס שוב → אמור לקבל רשימה ריקה או נכס אחר

---

## 🔍 בדיקת תקינות השרת

### ✅ Checklist מהיר

#### Authentication
- [ ] הרשמה עובדת (201)
- [ ] התחברות עובדת (200)
- [ ] Token נשמר ומשמש

#### CRUD Operations
- [ ] CREATE - הוספת נכס (201)
- [ ] READ - קבלת נכסים (200)
- [ ] UPDATE - עדכון נכס (200)
- [ ] DELETE - מחיקת נכס (200)

#### אבטחה
- [ ] בקשה ללא token → 401
- [ ] בקשה עם token לא תקין → 401
- [ ] משתמש לא יכול לערוך נכס של משתמש אחר → 403

#### MongoDB
- [ ] המשתמש נשמר ב-`users` collection
- [ ] הנכס נשמר ב-`properties` collection
- [ ] הנתונים נשארים אחרי restart

---

## 🎯 דוגמאות בקשות מלאות

### תרחיש מלא - מההתחלה

#### 1. הרשמה
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "דני לוי",
  "email": "dani@test.com",
  "password": "pass123"
}
```
→ שמור את ה-token

#### 2. הוספת נכס
```
POST http://localhost:5000/api/properties
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "title": "וילה בהרצליה",
  "price": 5000000,
  "location": "הרצליה פיתוח",
  "description": "וילה מפוארת עם בריכה",
  "status": "זמין"
}
```
→ שמור את ה-ID של הנכס

#### 3. קבלת כל הנכסים
```
GET http://localhost:5000/api/properties
Authorization: Bearer <TOKEN>
```

#### 4. עדכון הנכס
```
PUT http://localhost:5000/api/properties/<ID>
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "price": 5200000,
  "status": "נמכר"
}
```

#### 5. מחיקת הנכס
```
DELETE http://localhost:5000/api/properties/<ID>
Authorization: Bearer <TOKEN>
```

---

## ⚠️ בעיות נפוצות

### בעיה: "Cannot GET /"
**פתרון:** השרת לא רץ. הפעל עם `npm start`

### בעיה: "401 Unauthorized"
**פתרון:** 
- ודא שיש `Authorization: Bearer <token>` ב-Headers
- ודא שה-token תקין (נסה להתחבר מחדש)

### בעיה: "409 Conflict"
**פתרון:** האימייל כבר קיים, נסה עם אימייל אחר

### בעיה: "404 Not Found"
**פתרון:** 
- ודא שה-URL נכון
- ודא שה-ID של הנכס תקין

### בעיה: "500 Internal Server Error"
**פתרון:** 
- בדוק את ה-console של השרת
- ודא ש-MongoDB מחובר

---

## 📊 איך לבדוק ב-MongoDB Compass

1. פתח **MongoDB Compass**
2. התחבר ל-Cluster שלך
3. פתח את מסד הנתונים `realestateDB`
4. בדוק:
   - **Collection `users`** → אמור להכיל את המשתמש שנרשם
   - **Collection `properties`** → אמור להכיל את הנכסים שיצרת

---

## 🎉 סיכום

אחרי שתעבור על כל הבדיקות האלה:
- ✅ השרת רץ
- ✅ Authentication עובד
- ✅ CRUD עובד
- ✅ MongoDB מחובר
- ✅ הנתונים נשמרים

**הכל מוכן!** 🚀

---

## 📚 קבצים נוספים

- `POSTMAN_STEP_BY_STEP.md` - מדריך מפורט יותר
- `POSTMAN_GUIDE.md` - מדריך מלא
- `Postman_Collection.json` - ייבוא ל-Postman

