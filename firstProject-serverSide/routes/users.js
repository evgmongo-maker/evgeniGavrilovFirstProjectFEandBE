/**
 * Users Routes - נתיבי מידע וניהול עצמי של משתמש (מאומת)
 */

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getMe, updateMe, deleteMe } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users/me - שליפת פרטי המשתמש המחובר
router.get('/me', authMiddleware, getMe);

// PUT /api/users/me - עדכון פרטי המשתמש המחובר
router.put('/me', authMiddleware, updateMe);

// DELETE /api/users/me - מחיקת המשתמש המחובר
router.delete('/me', authMiddleware, deleteMe);

export default router;




