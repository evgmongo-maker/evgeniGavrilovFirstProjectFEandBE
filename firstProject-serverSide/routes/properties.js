/**
 * Properties Routes - נתיבי ניהול נכסים
 * 
 * תפקיד: ניהול מלא של נכסי נדל"ן (CRUD - Create, Read, Update, Delete)
 * נתיבים: GET, POST, PUT, DELETE /api/properties
 * 
 * כל הנתיבים מוגנים ב-authMiddleware - רק משתמשים מחוברים יכולים לגשת
 * הערה: המידע נשמר ב-MongoDB
 */

import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from '../middleware/authMiddleware.js';
import Property from '../models/Property.js';

const router = express.Router();

/**
 * GET /api/properties
 * קבלת כל הנכסים של המשתמש המחובר
 * 
 * Headers נדרש:
 * Authorization: Bearer <token>
 * 
 * תהליך:
 * 1. authMiddleware בודק שהמשתמש מחובר
 * 2. שולף נכסים של המשתמש הזה מ-MongoDB (לפי userId)
 * 3. מחזיר את רשימת הנכסים
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    // req.user נוסף על ידי authMiddleware
    const userId = req.user.userId;

    // המרת userId למחרוזת ObjectId תקינה
    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    // שליפת נכסים של המשתמש המחובר מ-MongoDB
    const userProperties = await Property.find({ userId: userObjectId });

    // המרת ObjectId ל-string עבור תאימות עם Frontend
    const properties = userProperties.map(prop => ({
      id: prop._id.toString(),
      title: prop.title,
      price: prop.price,
      location: prop.location,
      description: prop.description || '',
      status: prop.status,
      userId: prop.userId.toString(),
      createdAt: prop.createdAt,
      updatedAt: prop.updatedAt
    }));

    // החזרת הנכסים
    res.status(200).json({
      count: properties.length,
      properties
    });

    console.log(`📋 משתמש ${req.user.email} שלף ${properties.length} נכסים`);

  } catch (error) {
    console.error('שגיאה בשליפת נכסים:', error);
    res.status(500).json({ 
      error: 'שגיאת שרת',
      message: 'אירעה שגיאה בשליפת הנכסים' 
    });
  }
});

/**
 * POST /api/properties
 * הוספת נכס חדש
 * 
 * Headers נדרש:
 * Authorization: Bearer <token>
 * 
 * Body שדרוש:
 * {
 *   "title": "כותרת הנכס",
 *   "price": 1500000,
 *   "location": "תל אביב",
 *   "description": "תיאור הנכס",
 *   "status": "זמין"
 * }
 * 
 * תהליך:
 * 1. בדיקת תקינות הנתונים (validation)
 * 2. יצירת נכס חדש
 * 3. שמירה ב-MongoDB
 * 4. החזרת הנכס שנוצר
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, price, location, description, status } = req.body;
    const userId = req.user.userId;

    // Validation - בדיקת שדות חובה
    if (!title || !price || !location) {
      return res.status(400).json({ 
        error: 'חסרים שדות חובה',
        message: 'נא למלא כותרת, מחיר ומיקום' 
      });
    }

    // בדיקת תקינות מחיר
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ 
        error: 'מחיר לא תקין',
        message: 'המחיר חייב להיות מספר חיובי' 
      });
    }

    // בדיקת סטטוס תקין
    const validStatuses = ['זמין', 'נמכר'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'סטטוס לא תקין',
        message: `הסטטוס חייב להיות אחד מהבאים: ${validStatuses.join(', ')}` 
      });
    }

    // המרת userId ל-ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    // יצירת נכס חדש ב-MongoDB
    const newProperty = new Property({
      title: title.trim(),
      price: Number(price),
      location: location.trim(),
      description: description ? description.trim() : '',
      status: status || 'זמין', // ברירת מחדל: זמין
      userId: userObjectId // קישור למשתמש שיצר את הנכס
    });

    // שמירה ב-MongoDB
    await newProperty.save();

    // החזרת הנכס שנוצר (עם ID כמחרוזת)
    const propertyResponse = {
      id: newProperty._id.toString(),
      title: newProperty.title,
      price: newProperty.price,
      location: newProperty.location,
      description: newProperty.description || '',
      status: newProperty.status,
      userId: newProperty.userId.toString(),
      createdAt: newProperty.createdAt,
      updatedAt: newProperty.updatedAt
    };

    // החזרת תגובה מוצלחת
    res.status(201).json({
      message: 'נכס נוסף בהצלחה',
      property: propertyResponse
    });

    console.log(`✅ נכס חדש נוסף: ${title} על ידי ${req.user.email}`);

  } catch (error) {
    console.error('שגיאה בהוספת נכס:', error);
    res.status(500).json({ 
      error: 'שגיאת שרת',
      message: 'אירעה שגיאה בהוספת הנכס',
      details: error.message 
    });
  }
});

/**
 * PUT /api/properties/:id
 * עדכון נכס קיים
 * 
 * Headers נדרש:
 * Authorization: Bearer <token>
 * 
 * Parameters:
 * :id - מזהה הנכס לעדכון (MongoDB ObjectId)
 * 
 * Body (כל השדות אופציונליים):
 * {
 *   "title": "כותרת מעודכנת",
 *   "price": 1600000,
 *   "location": "מיקום מעודכן",
 *   "description": "תיאור מעודכן",
 *   "status": "נמכר"
 * }
 * 
 * תהליך:
 * 1. חיפוש הנכס לפי ID ב-MongoDB
 * 2. בדיקה שהנכס שייך למשתמש המחובר
 * 3. עדכון השדות שנשלחו
 * 4. שמירה ב-MongoDB
 * 5. החזרת הנכס המעודכן
 */
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, location, description, status } = req.body;
    const userId = req.user.userId;

    // חיפוש הנכס ב-MongoDB
    const property = await Property.findById(id);
    
    if (!property) {
      return res.status(404).json({ 
        error: 'נכס לא נמצא',
        message: 'הנכס המבוקש אינו קיים במערכת' 
      });
    }

    // המרת userId ל-ObjectId להשוואה
    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    // בדיקה שהנכס שייך למשתמש
    if (property.userId.toString() !== userObjectId.toString()) {
      return res.status(403).json({ 
        error: 'אין הרשאה',
        message: 'אין לך הרשאה לערוך נכס זה' 
      });
    }

    // עדכון השדות (רק אם נשלחו)
    if (title !== undefined) property.title = title.trim();
    if (price !== undefined) {
      if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ 
          error: 'מחיר לא תקין',
          message: 'המחיר חייב להיות מספר חיובי' 
        });
      }
      property.price = Number(price);
    }
    if (location !== undefined) property.location = location.trim();
    if (description !== undefined) property.description = description.trim();
    if (status !== undefined) {
      const validStatuses = ['זמין', 'נמכר'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          error: 'סטטוס לא תקין',
          message: `הסטטוס חייב להיות אחד מהבאים: ${validStatuses.join(', ')}` 
        });
      }
      property.status = status;
    }

    // שמירה ב-MongoDB
    await property.save();

    // החזרת הנכס המעודכן
    const propertyResponse = {
      id: property._id.toString(),
      title: property.title,
      price: property.price,
      location: property.location,
      description: property.description || '',
      status: property.status,
      userId: property.userId.toString(),
      createdAt: property.createdAt,
      updatedAt: property.updatedAt
    };

    res.status(200).json({
      message: 'נכס עודכן בהצלחה',
      property: propertyResponse
    });

    console.log(`✏️ נכס ${id} עודכן על ידי ${req.user.email}`);

  } catch (error) {
    console.error('שגיאה בעדכון נכס:', error);
    
    // טיפול בשגיאת ObjectId לא תקין
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        error: 'מזהה נכס לא תקין',
        message: 'המזהה שנשלח אינו תקין' 
      });
    }
    
    res.status(500).json({ 
      error: 'שגיאת שרת',
      message: 'אירעה שגיאה בעדכון הנכס' 
    });
  }
});

/**
 * DELETE /api/properties/:id
 * מחיקת נכס
 * 
 * Headers נדרש:
 * Authorization: Bearer <token>
 * 
 * Parameters:
 * :id - מזהה הנכס למחיקה (MongoDB ObjectId)
 * 
 * תהליך:
 * 1. חיפוש הנכס לפי ID ב-MongoDB
 * 2. בדיקה שהנכס שייך למשתמש המחובר
 * 3. מחיקת הנכס מ-MongoDB
 * 4. החזרת הודעת הצלחה
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // חיפוש הנכס ב-MongoDB
    const property = await Property.findById(id);
    
    if (!property) {
      return res.status(404).json({ 
        error: 'נכס לא נמצא',
        message: 'הנכס המבוקש אינו קיים במערכת' 
      });
    }

    // המרת userId ל-ObjectId להשוואה
    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    // בדיקה שהנכס שייך למשתמש
    if (property.userId.toString() !== userObjectId.toString()) {
      return res.status(403).json({ 
        error: 'אין הרשאה',
        message: 'אין לך הרשאה למחוק נכס זה' 
      });
    }

    // שמירת פרטי הנכס לפני המחיקה (להודעה)
    const deletedProperty = {
      id: property._id.toString(),
      title: property.title,
      price: property.price,
      location: property.location
    };

    // מחיקת הנכס מ-MongoDB
    await Property.findByIdAndDelete(id);

    // החזרת תגובה מוצלחת
    res.status(200).json({
      message: 'נכס נמחק בהצלחה',
      property: deletedProperty
    });

    console.log(`🗑️ נכס ${id} נמחק על ידי ${req.user.email}`);

  } catch (error) {
    console.error('שגיאה במחיקת נכס:', error);
    
    // טיפול בשגיאת ObjectId לא תקין
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        error: 'מזהה נכס לא תקין',
        message: 'המזהה שנשלח אינו תקין' 
      });
    }
    
    res.status(500).json({ 
      error: 'שגיאת שרת',
      message: 'אירעה שגיאה במחיקת הנכס' 
    });
  }
});

export default router;
