# 📋 מדריך שימוש ב-Postman Collection

## ✅ כן, צריך לייבא את הקובץ ל-Postman!

הקובץ `Postman_Collection.json` הוא קובץ הגדרות של Postman, ולא פועל לבד. צריך לייבא אותו ל-Postman כדי להשתמש בו.

---

## 📥 איך לייבא את הקובץ ל-Postman

### שלב 1: פתח את Postman
- אם אין לך Postman, הורד מ-https://www.postman.com/downloads/

### שלב 2: ייבא את הקובץ

**אפשרות 1: דרך הכפתור Import**
1. לחץ על הכפתור **"Import"** בפינה השמאלית העליונה
2. לחץ על **"Upload Files"** או **"Choose Files"**
3. נווט לתיקייה: `firstProject-serverSide`
4. בחר את הקובץ: `Postman_Collection.json`
5. לחץ **"Import"**

**אפשרות 2: גרור ושחרר (Drag & Drop)**
1. פתח את התיקייה `firstProject-serverSide` ב-Windows Explorer
2. גרור את הקובץ `Postman_Collection.json`
3. שחרר אותו בחלון Postman

### שלב 3: בדוק שהכל יובא

אחרי הייבוא, אתה אמור לראות בצד שמאל:

```
📁 נכסים בישראל - API Collection עם בדיקות מלאות
  📁 Authentication
    📄 הרשמה - Register
    📄 הרשמה - שגיאת אימייל קיים
    📄 הרשמה - שדות חסרים
    📄 התחברות - Login
    📄 התחברות - סיסמה שגויה
    📄 התנתקות - Logout
    📄 רשימת משתמשים - List Users
  📁 Properties
    📄 קבלת כל הנכסים - Get All Properties
    📄 הוספת נכס חדש - Create Property
    ...ועוד
  📁 Users
    📄 קבלת פרטי משתמש - Get Me
    ...ועוד
  📁 Root & Health
    📄 Root Endpoint - בדיקת שרת
    📄 404 - נתיב לא קיים
```

---

## ⚙️ הגדרת Environment (חובה!)

לפני הרצת הבדיקות, צריך להגדיר Environment:

### שלב 1: צור Environment חדש
1. לחץ על **"Environments"** בצד שמאל (או על העין בפינה הימנית העליונה)
2. לחץ על **"+"** או **"Create Environment"**
3. תן שם: `Local Development`

### שלב 2: הוסף משתנים
הוסף את המשתנים הבאים:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `base_url` | `http://localhost:5000` | `http://localhost:5000` |
| `token` | (ריק) | (ריק) |
| `user_id` | (ריק) | (ריק) |
| `user_email` | (ריק) | (ריק) |
| `property_id` | (ריק) | (ריק) |

### שלב 3: בחר את ה-Environment
1. בפינה הימנית העליונה, לחץ על ה-dropdown של Environments
2. בחר: `Local Development`

---

## 🚀 איך להריץ בדיקות

### סדר הרצה מומלץ:

1. **הרשמה - Register** (יוצר משתמש חדש ושומר token)
2. **התחברות - Login** (מתחבר עם המשתמש)
3. **הוספת נכס חדש - Create Property** (יוצר נכס)
4. **עדכון נכס - Update Property** (מעדכן את הנכס)
5. **מחיקת נכס - Delete Property** (מוחק את הנכס)

### איך להריץ:

1. פתח בקשה מהרשימה (למשל: "הרשמה - Register")
2. לחץ על **"Send"**
3. בתחתית המסך תראה:
   - **Response** - התגובה מהשרת
   - **Test Results** - תוצאות הבדיקות האוטומטיות

### תוצאות הבדיקות:

- ✅ **ירוק** = בדיקה עברה בהצלחה
- ❌ **אדום** = בדיקה נכשלה

---

## 🗄️ MongoDB Compass - מה הקשר?

### מה זה MongoDB Compass?

**MongoDB Compass** הוא כלי גרפי לניהול מסד נתונים MongoDB. הוא מאפשר:
- לצפות בנתונים שנשמרו במסד הנתונים
- לערוך נתונים ידנית
- לבדוק מבנה collections
- להריץ שאילתות

### האם MongoDB Compass תומך בבדיקות Postman?

**לא!** MongoDB Compass **לא תומך** בבדיקות API.

### מה הקשר ביניהם?

1. **Postman** בודק את ה-API (השרת):
   - שולח בקשות HTTP
   - בודק תגובות
   - מאמת מבנה JSON
   - בודק קודי סטטוס

2. **MongoDB Compass** מציג את הנתונים במסד הנתונים:
   - אחרי שהבדיקות ב-Postman עוברות, הנתונים נשמרים ב-MongoDB
   - אפשר לפתוח Compass ולראות את הנתונים שנשמרו
   - זה עוזר לוודא שהנתונים נשמרו נכון

### דוגמה לעבודה משולבת:

```
1. Postman: הרצת "הרשמה - Register"
   ↓
2. השרת: שומר משתמש חדש ב-MongoDB
   ↓
3. MongoDB Compass: אפשר לראות את המשתמש החדש ב-collection "users"
   ↓
4. Postman: הרצת "הוספת נכס חדש"
   ↓
5. MongoDB Compass: אפשר לראות את הנכס החדש ב-collection "properties"
```

### איך לפתוח MongoDB Compass:

1. פתח את MongoDB Compass
2. התחבר עם ה-connection string שלך (מה-`.env`):
   ```
   mongodb://localhost:27017/your-database-name
   ```
3. בחר את המסד נתונים שלך
4. צפה ב-collections:
   - `users` - כל המשתמשים
   - `properties` - כל הנכסים

---

## 📊 סיכום

| כלי | תפקיד | תומך בבדיקות? |
|-----|-------|---------------|
| **Postman** | בדיקות API, שליחת בקשות HTTP | ✅ כן - זה הכלי לבדיקות |
| **MongoDB Compass** | צפייה ועריכה של נתונים במסד הנתונים | ❌ לא - רק לצפייה בנתונים |

### תהליך עבודה מומלץ:

1. ✅ הפעל את השרת (`npm start`)
2. ✅ ייבא את `Postman_Collection.json` ל-Postman
3. ✅ הגדר Environment ב-Postman
4. ✅ הרץ בדיקות ב-Postman
5. ✅ פתח MongoDB Compass כדי לראות את הנתונים שנשמרו

---

## ❓ שאלות נפוצות

### Q: למה הבדיקות נכשלות?
**A:** בדוק:
- האם השרת רץ? (`npm start`)
- האם ה-Environment נבחר ב-Postman?
- האם `base_url` נכון? (`http://localhost:5000`)

### Q: איך אני רואה את הנתונים ב-MongoDB?
**A:** פתח MongoDB Compass והתחבר עם ה-connection string שלך

### Q: האם אני צריך MongoDB Compass כדי להריץ בדיקות?
**A:** לא! הבדיקות ב-Postman עובדות לבד. Compass רק עוזר לראות את הנתונים.

### Q: איך אני יודע שהבדיקות עובדות?
**A:** ב-Postman, אחרי שליחת בקשה, תראה את תוצאות הבדיקות בתחתית המסך (Test Results)

---

## 📝 הערות חשובות

1. **השרת חייב לרוץ** לפני הרצת בדיקות ב-Postman
2. **MongoDB חייב לרוץ** (או להיות זמין) כדי שהשרת יעבוד
3. **Environment ב-Postman** חייב להיות מוגדר ונבחר
4. **סדר הרצה חשוב** - הרשמה לפני התחברות, התחברות לפני נכסים

---

## 🔗 קישורים שימושיים

- [מדריך ייבוא מלא](HOW_TO_IMPORT_POSTMAN.md)
- [סיכום בדיקות](POSTMAN_TESTS_SUMMARY.md)
- [מדריך Postman כללי](POSTMAN_GUIDE.md)

