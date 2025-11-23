# 🌐 הגדרת Cursor לפתיחת לינקים בדפדפן החיצוני

## הבעיה
כשאתה לוחץ Ctrl + קליק על לינק (כמו `http://localhost:5173/`), הלינק נפתח בתוך Cursor במקום בדפדפן החיצוני.

## ✅ מה שתוקן

### 1. עדכון הגדרות Cursor/VS Code
נוספו הגדרות ב-`.vscode/settings.json`:
- `markdown.preview.openMarkdownLinks: "inExternalBrowser"`
- כיבוי Browser Preview פנימי
- הגדרות Terminal לפתיחה בדפדפן החיצוני

### 2. עדכון Vite Config
נוסף ב-`vite.config.js`:
- `server.open: true` - פתיחת דפדפן אוטומטית בעת הרצת `pnpm run dev`

---

## 🔧 פתרונות נוספים (אם עדיין לא עובד)

### פתרון 1: הגדרות ידניות ב-Cursor

1. לחץ על `Ctrl + ,` (או `File > Preferences > Settings`)
2. חפש: `markdown.preview.openMarkdownLinks`
3. שנה ל: `inExternalBrowser`
4. חפש: `workbench.editor.enablePreview`
5. ודא שזה `false`

### פתרון 2: שימוש ב-Command Palette

1. לחץ `Ctrl + Shift + P`
2. הקלד: `Simple Browser: Show`
3. זה יפתח דפדפן פנימי - סגור אותו
4. עכשיו לינקים יפתחו בדפדפן החיצוני

### פתרון 3: קליק ימני על לינק

במקום Ctrl + קליק, נסה:
- **קליק ימני** על הלינק
- בחר: **"Open Link in Browser"** או **"Open in External Browser"**

### פתרון 4: שימוש בטרמינל

אם זה עדיין לא עובד, פתח את הלינק ישירות מהטרמינל:

```powershell
# Windows
start http://localhost:5173

# או
Start-Process http://localhost:5173
```

---

## 🚀 פתרון מומלץ: Vite פותח אוטומטית

עכשיו כשתריץ `pnpm run dev` ב-Client, Vite יפתח את הדפדפן אוטומטית!

```bash
cd firstProject-clientSide
pnpm run dev
```

הדפדפן יפתח אוטומטית עם `http://localhost:5173`

---

## 📝 הערות

1. **רענון Cursor**: אחרי שינוי ההגדרות, סגור ופתח מחדש את Cursor
2. **הרצה מחדש**: אם השרת כבר רץ, עצור אותו (`Ctrl + C`) והרץ שוב
3. **בדיקת הגדרות**: ודא שההגדרות נשמרו ב-`.vscode/settings.json`

---

## 🔍 איך לבדוק שהכל עובד

1. **פתח קובץ Markdown** (למשל `README.md`)
2. **לחץ Ctrl + קליק** על לינק
3. **הדפדפן החיצוני** אמור להיפתח

או:

1. **הרץ `pnpm run dev`** ב-Client
2. **הדפדפן יפתח אוטומטית** עם `http://localhost:5173`

---

## ❓ אם זה עדיין לא עובד

1. **סגור ופתח מחדש את Cursor**
2. **בדוק את ההגדרות** ב-`Ctrl + ,`
3. **נסה פתרון 3** (קליק ימני)
4. **השתמש בטרמינל** (פתרון 4)

---

**בהצלחה! 🎉**



