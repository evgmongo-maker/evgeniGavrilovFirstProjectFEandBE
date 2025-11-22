/**
 * User Model - מודל משתמש
 * מגדיר את המבנה של משתמש במסד הנתונים MongoDB
 */

import mongoose from 'mongoose';

// הגדרת Schema למשתמש
const userSchema = new mongoose.Schema({
  // שם המשתמש
  name: {
    type: String,
    required: [true, 'שם משתמש הוא שדה חובה'],
    trim: true,
    minlength: [2, 'שם משתמש חייב להכיל לפחות 2 תווים']
  },
  
  // אימייל - ייחודי לכל משתמש
  email: {
    type: String,
    required: [true, 'אימייל הוא שדה חובה'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'אנא הכנס אימייל תקין']
  },
  
  // סיסמה מוצפנת
  password: {
    type: String,
    required: [true, 'סיסמה היא שדה חובה'],
    minlength: [6, 'סיסמה חייבת להכיל לפחות 6 תווים']
  }
}, {
  // הוספת timestamps אוטומטית (createdAt, updatedAt)
  timestamps: true
});

// יצירת מודל מה-Schema
const User = mongoose.model('User', userSchema);

export default User;
