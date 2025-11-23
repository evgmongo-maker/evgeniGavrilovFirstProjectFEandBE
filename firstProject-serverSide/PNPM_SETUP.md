# 🚀 הגדרת pnpm לפרויקט Server

## 📋 שלבים להתקנה

### שלב 1: התקנת pnpm (אם עדיין לא מותקן)

```bash
npm install -g pnpm
```

או עם PowerShell (Windows):
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

### שלב 2: הסרת package-lock.json

```bash
# בתיקיית firstProject-serverSide
rm package-lock.json
```

או ב-Windows PowerShell:
```powershell
Remove-Item package-lock.json
```

### שלב 3: התקנת תלויות עם pnpm

```bash
pnpm install
```

זה ייצור את `pnpm-lock.yaml` אוטומטית.

### שלב 4: הרצת השרת

```bash
pnpm run dev
```

השרת ירוץ על `http://localhost:5000`

---

## ✅ אימות שהכל עובד

אחרי `pnpm install`, אתה אמור לראות:
- ✅ תיקיית `node_modules` נוצרה
- ✅ קובץ `pnpm-lock.yaml` נוצר
- ✅ אין `package-lock.json`

---

## 📝 הערות

- `pnpm-lock.yaml` **חייב להיות ב-git** (לא ב-.gitignore)
- `package-lock.json` **לא צריך להיות ב-git** (נמצא ב-.gitignore)
- לפני הרצה, ודא שיש קובץ `.env` עם משתני הסביבה הנדרשים

