/**
 * Auth Controller - לוגיקה של הרשמה/התחברות/התנתקות ומשתמשים
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here-change-in-production';

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				error: 'כל השדות הם חובה',
				missingFields: {
					name: !name,
					email: !email,
					password: !password,
				},
			});
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				error: 'אימייל לא תקין',
				message: 'נא להזין כתובת אימייל תקינה',
			});
		}

		if (password.length < 6) {
			return res.status(400).json({
				error: 'סיסמה קצרה מדי',
				message: 'הסיסמה חייבת להכיל לפחות 6 תווים',
			});
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({
				error: 'משתמש כבר קיים',
				message: 'אימייל זה כבר רשום במערכת',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		const token = jwt.sign(
			{
				userId: newUser._id,
				email: newUser.email,
			},
			JWT_SECRET,
			{ expiresIn: '7d' }
		);

		res.status(201).json({
			message: 'משתמש נרשם בהצלחה!',
			user: {
				id: newUser._id,
				name: newUser.name,
				email: newUser.email,
			},
			token,
		});

		console.log(`✅ משתמש חדש נרשם: ${email}`);
	} catch (error) {
		console.error('שגיאה בהרשמה:', error);
		res.status(500).json({
			error: 'שגיאה בהרשמת משתמש',
			details: error.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				error: 'אימייל וסיסמה הם שדות חובה',
			});
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				error: 'אימייל או סיסמה שגויים',
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				error: 'אימייל או סיסמה שגויים',
			});
		}

		const token = jwt.sign(
			{
				userId: user._id,
				email: user.email,
			},
			JWT_SECRET,
			{ expiresIn: '7d' }
		);

		res.json({
			message: 'התחברות בוצעה בהצלחה!',
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
			token,
		});

		console.log(`✅ משתמש התחבר: ${email}`);
	} catch (error) {
		console.error('שגיאה בהתחברות:', error);
		res.status(500).json({
			error: 'שגיאה בהתחברות',
			details: error.message,
		});
	}
};

export const logout = (req, res) => {
	try {
		res.status(200).json({
			message: 'התנתקת בהצלחה',
		});

		console.log(`✅ משתמש התנתק`);
	} catch (error) {
		console.error('שגיאה בהתנתקות:', error);
		res.status(500).json({
			error: 'שגיאת שרת',
			message: 'אירעה שגיאה בתהליך ההתנתקות',
		});
	}
};

export const listUsers = async (req, res) => {
	try {
		const users = await User.find().select('-password');
		res.json({
			count: users.length,
			users,
		});
	} catch (error) {
		console.error('שגיאה בקבלת משתמשים:', error);
		res.status(500).json({
			error: 'שגיאה בקבלת משתמשים',
			details: error.message,
		});
	}
};

export default {
	register,
	login,
	logout,
	listUsers,
};




