// Property slice - ניהול נכסים
import { createSlice } from '@reduxjs/toolkit';

/**
 * Property slice לניהול רשימת הנכסים
 * כולל פעולות CRUD על נכסים
 */
const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [
      {
        id: 1,
        title: 'פנטהאוז 5 חדרים בתל אביב',
        description: 'פנטהאוז מפואר עם מרפסת גג גדולה, נוף פנורמי לים ולעיר. דירה חדשה עם גימורים יוקרתיים, מטבח מעוצב, 3 חניות וחדר ארונות.',
        price: 4500000,
        location: 'תל אביב - רמת אביב',
        type: 'למכירה',
        bedrooms: 5,
        bathrooms: 3,
        area: 160,
        status: 'זמין',
        createdAt: '2025-10-10T09:00:00Z',
        image: 'https://via.placeholder.com/400x250/1e88e5/ffffff?text=פנטהאוז+תל+אביב'
      },
      {
        id: 2,
        title: 'דירת גן 4 חדרים בירושלים',
        description: 'דירת גן מרווחת בשכונה שקטה, עם גינה פרטית של 80 מ״ר. דירה משופצת לחלוטין, קרובה לבתי ספר ולתחבורה ציבורית.',
        price: 2800000,
        location: 'ירושלים - קטמון',
        type: 'למכירה',
        bedrooms: 4,
        bathrooms: 2,
        area: 120,
        status: 'זמין',
        createdAt: '2025-10-08T14:30:00Z',
        image: 'https://via.placeholder.com/400x250/ff6b35/ffffff?text=דירת+גן+ירושלים'
      },
      {
        id: 3,
        title: 'דירת 3 חדרים להשכרה בחיפה',
        description: 'דירה מקסימה עם נוף לים התיכון, מרוהטת במלואה. כוללת מזגן בכל החדרים, מטבח מאובזר וחניה פרטית.',
        price: 7500,
        location: 'חיפה - כרמל',
        type: 'להשכרה',
        bedrooms: 3,
        bathrooms: 2,
        area: 95,
        status: 'זמין',
        createdAt: '2025-10-05T11:15:00Z',
        image: 'https://via.placeholder.com/400x250/28a745/ffffff?text=דירה+בחיפה'
      },
      {
        id: 4,
        title: 'דופלקס 6 חדרים ברמת גן',
        description: 'דופלקס יוקרתי בלב רמת גן, 2 קומות עם מעלית פרטית. גינה של 120 מ״ר, בריכה פרטית וחניות מקורות לשתי מכוניות.',
        price: 6200000,
        location: 'רמת גן - הגפן',
        type: 'למכירה',
        bedrooms: 6,
        bathrooms: 4,
        area: 220,
        status: 'זמין',
        createdAt: '2025-10-01T16:45:00Z',
        image: 'https://via.placeholder.com/400x250/9c27b0/ffffff?text=דופלקס+רמת+גן'
      },
      {
        id: 5,
        title: 'דירת 2 חדרים בבאר שבע',
        description: 'דירה חדשה במגדל יוקרה, קומה גבוהה עם נוף מדהים. מיקום מרכזי קרוב לאוניברסיטה ולמרכזי קניות.',
        price: 4200,
        location: 'באר שבע - רמות',
        type: 'להשכרה',
        bedrooms: 2,
        bathrooms: 1,
        area: 70,
        status: 'זמין',
        createdAt: '2025-09-28T13:20:00Z',
        image: 'https://via.placeholder.com/400x250/607d8b/ffffff?text=דירה+באר+שבע'
      },
      {
        id: 6,
        title: 'וילה 8 חדרים בהרצליה פיתוח',
        description: 'וילה מדהימה במיקום פרימיום, עם בריכה פרטית וגינה מעוצבת. 3 קומות, מרתף יין, חדר קולנוע ביתי וחניות ל-4 מכוניות.',
        price: 12000000,
        location: 'הרצליה פיתוח',
        type: 'למכירה',
        bedrooms: 8,
        bathrooms: 6,
        area: 400,
        status: 'נמכר',
        createdAt: '2025-09-25T10:00:00Z',
        image: 'https://via.placeholder.com/400x250/795548/ffffff?text=וילה+הרצליה'
      }
    ], // רשימת הנכסים עם נכסים לדוגמה
    loading: false, // סטטוס טעינה
    error: null, // הודעות שגיאה
  },
  reducers: {
    // התחלת טעינת נכסים
    fetchPropertiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // טעינת נכסים מוצלחת
    fetchPropertiesSuccess: (state, action) => {
      state.loading = false;
      state.properties = action.payload;
      state.error = null;
    },
    // כישלון בטעינת נכסים
    fetchPropertiesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // הוספת נכס חדש (מהשרת)
    addProperty: (state, action) => {
      state.properties.push(action.payload);
    },
    // עדכון נכס קיים
    updateProperty: (state, action) => {
      const index = state.properties.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = { ...state.properties[index], ...action.payload };
      }
    },
    // מחיקת נכס
    deleteProperty: (state, action) => {
      state.properties = state.properties.filter(p => p.id !== action.payload);
    },
    // עדכון סטטוס נכס (זמין/נמכר)
    updatePropertyStatus: (state, action) => {
      const { id, status } = action.payload;
      const property = state.properties.find(p => p.id === id);
      if (property) {
        property.status = status;
      }
    },
    // ניקוי שגיאות
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
  addProperty,
  updateProperty,
  deleteProperty,
  updatePropertyStatus,
  clearError,
} = propertySlice.actions;

export default propertySlice.reducer;