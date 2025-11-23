# 🚀 הגדרת pnpm לפרויקט המלא

מדריך זה מסביר איך להגדיר את שני הפרויקטים (Client + Server) לשימוש ב-`pnpm run dev`.

---

## 📋 שלבים כלליים

### שלב 1: התקנת pnpm

אם עדיין לא מותקן pnpm:

**Windows (PowerShell):**
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

**Mac/Linux:**
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

**או עם npm:**
```bash
npm install -g pnpm
```

---

## 🎨 Client Side (firstProject-clientSide)

### שלב 1: נווט לתיקייה
```bash
cd firstProject-clientSide
```

### שלב 2: הסר package-lock.json
```bash
# Windows PowerShell
Remove-Item package-lock.json

# Mac/Linux
rm package-lock.json
```

### שלב 3: התקן תלויות
```bash
pnpm install
```

זה ייצור את `pnpm-lock.yaml` אוטומטית.

### שלב 4: הרץ את הפרויקט
```bash
pnpm run dev
```

האפליקציה תרוץ על `http://localhost:5173`

---

## 🖥️ Server Side (firstProject-serverSide)

### שלב 1: נווט לתיקייה
```bash
cd firstProject-serverSide
```

### שלב 2: הסר package-lock.json
```bash
# Windows PowerShell
Remove-Item package-lock.json

# Mac/Linux
rm package-lock.json
```

### שלב 3: התקן תלויות
```bash
pnpm install
```

זה ייצור את `pnpm-lock.yaml` אוטומטית.

### שלב 4: ודא שיש קובץ .env
בדוק שיש קובץ `.env` עם:
```
MONGODB_URI=mongodb://localhost:27017/your-database-name
PORT=5000
JWT_SECRET=your-secret-key-here
CLIENT_URL=http://localhost:5173
```

### שלב 5: הרץ את השרת
```bash
pnpm run dev
```

השרת ירוץ על `http://localhost:5000`

---

## ✅ אימות שהכל עובד

אחרי ההתקנה, בכל פרויקט אתה אמור לראות:

### Client Side:
- ✅ `pnpm-lock.yaml` קיים
- ✅ אין `package-lock.json`
- ✅ `pnpm run dev` מריץ את Vite

### Server Side:
- ✅ `pnpm-lock.yaml` קיים
- ✅ אין `package-lock.json`
- ✅ `pnpm run dev` מריץ את השרת עם nodemon

---

## 📁 קבצים שנוצרו/עודכנו

### Client Side:
- ✅ `.github/workflows/ci.yml` - GitHub Actions workflow
- ✅ `PNPM_SETUP.md` - מדריך התקנה
- ✅ `README.md` - עודכן עם הוראות pnpm
- ✅ `.gitignore` - עודכן (מתעלם מ-package-lock.json)

### Server Side:
- ✅ `.github/workflows/ci.yml` - GitHub Actions workflow
- ✅ `PNPM_SETUP.md` - מדריך התקנה
- ✅ `README.md` - עודכן עם הוראות pnpm
- ✅ `.gitignore` - עודכן (מתעלם מ-package-lock.json)

---

## 🔄 סדר הרצה מומלץ

1. **הפעל את השרת:**
   ```bash
   cd firstProject-serverSide
   pnpm run dev
   ```

2. **הפעל את ה-Client (בטרמינל נפרד):**
   ```bash
   cd firstProject-clientSide
   pnpm run dev
   ```

3. **פתח בדפדפן:**
   - Client: `http://localhost:5173`
   - Server: `http://localhost:5000`

---

## 🐛 פתרון בעיות

### בעיה: `pnpm: command not found`
**פתרון:** התקן pnpm (ראה שלב 1 למעלה)

### בעיה: `Error: Cannot find module`
**פתרון:** הרץ `pnpm install` שוב

### בעיה: השרת לא מתחבר ל-MongoDB
**פתרון:** 
- ודא ש-MongoDB רץ
- בדוק את `MONGODB_URI` ב-`.env`

### בעיה: Port already in use
**פתרון:**
- שים לב שהשרת רץ על פורט 5000
- ה-Client רץ על פורט 5173
- אם יש התנגשות, שנה את הפורט ב-`.env` או `vite.config.js`

---

## 📝 הערות חשובות

1. **`pnpm-lock.yaml` חייב להיות ב-git** - זה קובץ חשוב שצריך להיות בקוד
2. **`package-lock.json` לא צריך להיות ב-git** - זה קובץ של npm, לא pnpm
3. **GitHub Actions** - ה-workflows שיצרנו ירוצו אוטומטית ב-CI/CD
4. **סדר הרצה** - תמיד הפעל את השרת לפני ה-Client

---

## 🔗 קישורים שימושיים

- [pnpm Documentation](https://pnpm.io/)
- [Client Setup Guide](firstProject-clientSide/PNPM_SETUP.md)
- [Server Setup Guide](firstProject-serverSide/PNPM_SETUP.md)

---

## ✅ סיכום

עכשיו הפרויקט מוכן לשימוש ב-`pnpm run dev`!

**להתחיל:**
1. התקן pnpm
2. הסר `package-lock.json` משני הפרויקטים
3. הרץ `pnpm install` בכל פרויקט
4. הרץ `pnpm run dev` בכל פרויקט

**בהצלחה! 🚀**

