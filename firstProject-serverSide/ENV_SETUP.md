# 🔧 הגדרת משתני סביבה (.env)

## ✅ הקובץ .env נוצר בהצלחה!

הקובץ `.env` נוצר עם ההגדרות הבאות:

### 📋 תוכן הקובץ:

```env
MONGODB_URI=mongodb+srv://evgmongo:q25ufdt2BgsNThLT@cluster0.jheehg9.mongodb.net/realestateDB?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here-change-in-production-realestate-israel-2025
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 🔍 הסבר על כל משתנה:

1. **MONGODB_URI** - Connection string למסד הנתונים MongoDB Atlas
   - מסד הנתונים: `realestateDB`
   - Cluster: `cluster0.jheehg9.mongodb.net`
   - משתמש: `evgmongo`

2. **JWT_SECRET** - מפתח סודי להצפנת JWT tokens
   - ⚠️ **חשוב**: בפרודקשן אמיתי, שנה למחרוזת מורכבת ואקראית!

3. **PORT** - פורט השרת (ברירת מחדל: 5000)

4. **CLIENT_URL** - כתובת הצד לקוח (Frontend)
   - פורט ברירת מחדל של Vite: 5173

### 🚀 איך להפעיל את השרת:

1. **ודא שהקובץ .env קיים:**
   ```bash
   cd firstProject-serverSide
   ls .env  # או dir .env ב-Windows
   ```

2. **התקן dependencies (אם עדיין לא):**
   ```bash
   npm install
   ```

3. **הפעל את השרת:**
   ```bash
   npm start
   # או למצב פיתוח:
   npm run dev
   ```

4. **בדוק שהחיבור ל-MongoDB עובד:**
   - אתה אמור לראות הודעה:
   ```
   ✅ MongoDB מחובר בהצלחה!
   📊 מסד נתונים: realestateDB
   🌐 Host: cluster0-shard-00-00.jheehg9.mongodb.net
   ```

### ⚠️ בעיות נפוצות:

#### 1. שגיאת חיבור ל-MongoDB:
```
❌ שגיאה בחיבור ל-MongoDB: ...
```

**פתרונות:**
- ודא שה-connection string נכון
- ודא שיש לך גישה לאינטרנט
- ודא שה-IP שלך מורשה ב-MongoDB Atlas Network Access
- בדוק שהסיסמה נכונה

#### 2. שגיאת "MONGODB_URI is not defined":
```
ReferenceError: process.env.MONGODB_URI is not defined
```

**פתרון:**
- ודא שקובץ `.env` קיים בתיקיית `firstProject-serverSide`
- ודא שהקובץ נקרא בדיוק `.env` (לא `.env.txt` או משהו אחר)
- ודא ש-`dotenv.config()` רץ ב-`server.js`

#### 3. שגיאת CORS:
```
Access to fetch at 'http://localhost:5000/...' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**פתרון:**
- ודא ש-`CLIENT_URL` ב-`.env` תואם לכתובת של הצד לקוח
- אם הצד לקוח רץ על פורט אחר, עדכן את `CLIENT_URL`

### 🔒 אבטחה:

⚠️ **חשוב מאוד:**
- קובץ `.env` מכיל מידע רגיש (סיסמאות, מפתחות)
- הקובץ כבר מוגדר ב-`.gitignore` ולא יועלה ל-Git
- **אל תעלה את הקובץ .env ל-GitHub או לכל מקום ציבורי!**

### 📝 עדכון Connection String:

אם צריך לעדכן את ה-connection string:

1. פתח את קובץ `.env`
2. עדכן את `MONGODB_URI` עם ה-connection string החדש
3. שמור את הקובץ
4. הפעל מחדש את השרת

### 🎯 בדיקת החיבור:

לאחר הפעלת השרת, נסה:

```bash
# בדיקה בסיסית
curl http://localhost:5000

# או פתח בדפדפן:
http://localhost:5000
```

אמור להחזיר:
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

---

**✅ הכל מוכן! השרת אמור להתחבר ל-MongoDB Atlas בהצלחה.**

לשאלות או בעיות, בדוק את ה-logs של השרת.

