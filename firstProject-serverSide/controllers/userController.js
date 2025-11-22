/**
 * User Controller - פעולות CRUD בסיסיות למשתמשים (ללא סיסמאות בתגובות)
 */

import User from '../models/User.js';

export const getMe = async (req, res) => {
	try {
		const userId = req.user.userId;
		const user = await User.findById(userId).select('-password');
		if (!user) {
			return res.status(404).json({ error: 'משתמש לא נמצא' });
		}
		res.json({ user });
	} catch (error) {
		console.error('שגיאה בשליפת פרטי משתמש:', error);
		res.status(500).json({ error: 'שגיאת שרת', details: error.message });
	}
};

export const updateMe = async (req, res) => {
	try {
		const userId = req.user.userId;
		const { name, email } = req.body;

		const updates = {};
		if (name !== undefined) updates.name = String(name).trim();
		if (email !== undefined) updates.email = String(email).trim().toLowerCase();

		const updated = await User.findByIdAndUpdate(userId, updates, {
			new: true,
			runValidators: true,
			select: '-password',
		});

		if (!updated) {
			return res.status(404).json({ error: 'משתמש לא נמצא' });
		}

		res.json({ message: 'פרטי המשתמש עודכנו', user: updated });
	} catch (error) {
		console.error('שגיאה בעדכון פרטי משתמש:', error);
		// טיפול בהתנגשויות אימייל ייחודי
		if (error?.code === 11000) {
			return res.status(409).json({ error: 'אימייל כבר בשימוש' });
		}
		res.status(500).json({ error: 'שגיאת שרת', details: error.message });
	}
};

export const deleteMe = async (req, res) => {
	try {
		const userId = req.user.userId;
		const deleted = await User.findByIdAndDelete(userId).select('-password');
		if (!deleted) {
			return res.status(404).json({ error: 'משתמש לא נמצא' });
		}
		res.json({ message: 'המשתמש נמחק', user: deleted });
	} catch (error) {
		console.error('שגיאה במחיקת משתמש:', error);
		res.status(500).json({ error: 'שגיאת שרת', details: error.message });
	}
};

export default {
	getMe,
	updateMe,
	deleteMe,
};


