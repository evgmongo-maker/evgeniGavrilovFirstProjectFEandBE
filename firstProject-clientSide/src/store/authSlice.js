// Authentication slice - ניהול מצב המשתמש
import { createSlice } from '@reduxjs/toolkit';

/**
 * Auth slice לניהול מצב ההתחברות של המשתמש
 * כולל מידע על משתמש מחובר, סטטוס התחברות
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // מידע המשתמש המחובר
    isAuthenticated: false, // האם המשתמש מחובר
    loading: false, // סטטוס טעינה
    error: null, // הודעות שגיאה
  },
  reducers: {
    // פעולה להתחלת תהליך התחברות
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // פעולה להתחברות מוצלחת
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    // פעולה לכישלון התחברות
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    // פעולה להתנתקות
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    // פעולה לניקוי שגיאות
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;