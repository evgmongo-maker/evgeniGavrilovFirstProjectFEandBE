// Redux store configuration for נכסים בישראל MVP
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import propertySlice from './propertySlice';

/**
 * Main Redux store configuration
 * ניהול state מרכזי לכל האפליקציה
 */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    properties: propertySlice,
  },
});

export default store;