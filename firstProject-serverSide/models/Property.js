/**
 * Property Model - מודל נכס
 * מגדיר את המבנה של נכס במסד הנתונים MongoDB
 */

import mongoose from 'mongoose';

// הגדרת Schema לנכס
const propertySchema = new mongoose.Schema({
  // כותרת הנכס
  title: {
    type: String,
    required: [true, 'כותרת היא שדה חובה'],
    trim: true,
    minlength: [3, 'כותרת חייבת להכיל לפחות 3 תווים'],
    maxlength: [100, 'כותרת לא יכולה להכיל יותר מ-100 תווים']
  },
  
  // מחיר הנכס
  price: {
    type: Number,
    required: [true, 'מחיר הוא שדה חובה'],
    min: [0, 'מחיר לא יכול להיות שלילי']
  },
  
  // מיקום הנכס
  location: {
    type: String,
    required: [true, 'מיקום הוא שדה חובה'],
    trim: true
  },
  
  // תיאור מפורט של הנכס
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'תיאור לא יכול להכיל יותר מ-1000 תווים']
  },
  
  // סטטוס הנכס (זמין/נמכר)
  status: {
    type: String,
    enum: ['זמין', 'נמכר'],
    default: 'זמין'
  },
  
  // קשר למשתמש שיצר את הנכס
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  // הוספת timestamps אוטומטית (createdAt, updatedAt)
  timestamps: true
});

// יצירת אינדקס לחיפוש מהיר לפי משתמש
propertySchema.index({ userId: 1 });

// יצירת מודל מה-Schema
const Property = mongoose.model('Property', propertySchema);

export default Property;
