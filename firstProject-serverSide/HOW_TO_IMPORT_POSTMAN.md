# 📥 איך לייבא את הקובץ ל-Postman

## 🎯 שלבים פשוטים

### שלב 1: פתח את Postman

1. פתח את Postman (אם אין לך, הורד מ-https://www.postman.com/downloads/)

### שלב 2: ייבא את הקובץ

**אפשרות 1: דרך הכפתור Import**
1. לחץ על הכפתור **"Import"** בפינה השמאלית העליונה
2. לחץ על **"Upload Files"** או **"Choose Files"**
3. נווט לתיקייה: `firstProject-serverSide`
4. בחר את הקובץ: `Postman_Collection.json`
5. לחץ **"Import"**

**אפשרות 2: גרור ושחרר**
1. פתח את התיקייה `firstProject-serverSide`
2. גרור את הקובץ `Postman_Collection.json`
3. שחרר אותו בחלון Postman

### שלב 3: בדוק שהכל יובא

אחרי הייבוא, אתה אמור לראות:

**בצד שמאל ב-Postman:**
```
📁 נכסים בישראל - API Collection
  📁 Authentication
    📄 הרשמה - Register
    📄 התחברות - Login
    📄 התנתקות - Logout
  📁 Properties
    📄 קבלת כל הנכסים - Get All Properties
    📄 הוספת נכס חדש - Create Property
    📄 עדכון נכס - Update Property
    📄 מחיקת נכס - Delete Property
```

---

## ⚙️ הגדרת Environment (מומלץ)

### למה צריך Environment?

ה-Environment מאפשר לך:
- לשמור את ה-`base_url` במקום אחד
- לשמור את ה-`token` אוטומטית
- לשמור את ה-`property_id` אוטומטית

### איך ליצור Environment:

1. לחץ על **"Environments"** בצד שמאל
2. לחץ על **"+"** ליצירת Environment חדש
3. שם: `נכסים בישראל - Local`
4. הוסף את המשתנים הבאים:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `base_url` | `http://localhost:5000` | `http://localhost:5000` |
| `token` | (ריק) | (ריק) |
| `user_id` | (ריק) | (ריק) |
| `property_id` | (ריק) | (ריק) |

5. לחץ **"Save"**
6. **בחר את ה-Environment** ברשימה (לחץ עליו)

---

## 🚀 איך להשתמש

### 1. ודא שהשרת רץ

```bash
cd firstProject-serverSide
npm start
```

### 2. סדר הבדיקות המומלץ:

#### שלב 1: הרשמה
1. פתח את **"הרשמה - Register"**
2. לחץ **"Send"**
3. ✅ ה-token נשמר אוטומטית ב-Environment!

#### שלב 2: התחברות (אופציונלי)
1. פתח את **"התחברות - Login"**
2. לחץ **"Send"**
3. ✅ ה-token מתעדכן אוטומטית!

#### שלב 3: הוספת נכס
1. פתח את **"הוספת נכס חדש - Create Property"**
2. לחץ **"Send"**
3. ✅ ה-`property_id` נשמר אוטומטית!

#### שלב 4: קבלת כל הנכסים
1. פתח את **"קבלת כל הנכסים - Get All Properties"**
2. לחץ **"Send"**
3. ✅ אמור להחזיר את הנכס שיצרת!

#### שלב 5: עדכון נכס
1. פתח את **"עדכון נכס - Update Property"**
2. לחץ **"Send"**
3. ✅ משתמש ב-`property_id` שנשמר אוטומטית!

#### שלב 6: מחיקת נכס
1. פתח את **"מחיקת נכס - Delete Property"**
2. לחץ **"Send"**
3. ✅ הנכס נמחק!

---

## ✨ תכונות מיוחדות בקובץ

### 1. שמירה אוטומטית של Token

כשאתה מבצע הרשמה או התחברות, ה-token נשמר אוטומטית ב-Environment!

**איך זה עובד:**
- יש **Test Script** בכל בקשה של Authentication
- אחרי תגובה מוצלחת, ה-token נשמר ב-`{{token}}`
- כל הבקשות הבאות משתמשות בו אוטומטית!

### 2. שמירה אוטומטית של Property ID

כשאתה יוצר נכס חדש, ה-ID נשמר אוטומטית!

**איך זה עובד:**
- יש **Test Script** בבקשה של Create Property
- אחרי תגובה מוצלחת, ה-ID נשמר ב-`{{property_id}}`
- בקשות Update ו-Delete משתמשות בו אוטומטית!

### 3. שימוש ב-Variables

כל ה-URLs משתמשים ב-`{{base_url}}`:
- אם תצטרך לשנות את הפורט, תשנה רק במקום אחד!

---

## 🔍 בדיקה שהכל עובד

### בדיקה 1: ה-Environment נבחר

1. בדוק בפינה הימנית העליונה
2. אמור להיות כתוב: `נכסים בישראל - Local` (או השם שנתת)
3. אם לא, לחץ עליו ובחר את ה-Environment

### בדיקה 2: המשתנים מוגדרים

1. לחץ על ה-Environment
2. בדוק שיש את כל המשתנים:
   - `base_url` = `http://localhost:5000`
   - `token` = (יכול להיות ריק בהתחלה)
   - `user_id` = (יכול להיות ריק בהתחלה)
   - `property_id` = (יכול להיות ריק בהתחלה)

### בדיקה 3: בקשה ראשונה

1. פתח את **"הרשמה - Register"**
2. לחץ **"Send"**
3. בדוק:
   - ✅ Status: `201 Created`
   - ✅ Response כולל `token`
   - ✅ ה-`token` נשמר ב-Environment (בדוק ב-Environment)

---

## 📝 שינוי נתונים בבקשות

### הרשמה/התחברות

לחץ על **"Body"** ושנה את הנתונים:
```json
{
  "name": "השם שלך",
  "email": "האימייל שלך",
  "password": "הסיסמה שלך"
}
```

### הוספת נכס

לחץ על **"Body"** ושנה את הנתונים:
```json
{
  "title": "כותרת הנכס",
  "price": 2500000,
  "location": "מיקום הנכס",
  "description": "תיאור הנכס",
  "status": "זמין"
}
```

---

## ⚠️ בעיות נפוצות

### בעיה: "base_url is not defined"
**פתרון:**
1. ודא שיצרת Environment
2. ודא שה-Environment נבחר
3. ודא שיש משתנה `base_url` ב-Environment

### בעיה: "token is not defined"
**פתרון:**
1. בצע הרשמה או התחברות קודם
2. ה-token יישמר אוטומטית
3. אם לא, בדוק את ה-Test Script

### בעיה: "property_id is not defined"
**פתרון:**
1. צור נכס חדש קודם
2. ה-ID יישמר אוטומטית
3. אם לא, בדוק את ה-Test Script

---

## 🎉 סיכום

אחרי הייבוא:
- ✅ כל ה-endpoints מוכנים לשימוש
- ✅ Token נשמר אוטומטית
- ✅ Property ID נשמר אוטומטית
- ✅ הכל מוכן לבדיקה!

**הכל מוכן! התחל לבדוק!** 🚀




