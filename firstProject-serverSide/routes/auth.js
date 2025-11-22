/**
 * Auth Routes - נתיבי אימות משתמשים
 * 
 * תפקיד: ניהול הרשמה, התחברות והתנתקות של משתמשים
 * נתיבים: /api/auth/register, /api/auth/login, /api/auth/logout
 * 
 * שימוש ב-MongoDB: כל המידע נשמר במסד נתונים אמיתי
 */

import express from 'express';
import { register, login, logout, listUsers } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/logout
router.post('/logout', logout);

// GET /api/auth/users (debug/dev)
router.get('/users', listUsers);

export default router;
