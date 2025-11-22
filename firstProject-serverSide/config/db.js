/**
 * Database Configuration - הגדרות חיבור למסד נתונים
 * קובץ זה אחראי על חיבור ל-MongoDB
 */

import mongoose from 'mongoose';

/**
 * פונקציה להתחברות ל-MongoDB
 * מתחברת למסד הנתונים ומטפלת בשגיאות
 */
const connectDB = async () => {
  try {
    // ניסיון התחברות עם ה-URI מקובץ .env
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB מחובר בהצלחה!`);
    console.log(`📊 מסד נתונים: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    
  } catch (error) {
    // במקרה של שגיאה בחיבור
    console.error(`❌ שגיאה בחיבור ל-MongoDB:`, error.message);
    
    // יציאה מהתהליך עם קוד שגיאה
    process.exit(1);
  }
};

/**
 * טיפול בסגירת חיבור נקייה
 * כאשר התהליך נסגר, נסגור גם את החיבור ל-MongoDB
 */
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('\n🔌 החיבור ל-MongoDB נסגר בהצלחה');
    process.exit(0);
  } catch (error) {
    console.error('❌ שגיאה בסגירת החיבור:', error.message);
    process.exit(1);
  }
});

export default connectDB;
