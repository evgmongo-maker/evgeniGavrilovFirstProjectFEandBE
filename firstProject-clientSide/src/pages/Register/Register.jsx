// Register page - דף הרשמה
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import styles from './Register.module.css';

/**
 * Register Page Component
 * דף הרשמה עם טופס הרשמה מלא
 * כולל validation ואימות נתונים
 */
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [success, setSuccess] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * פונקציה לטיפול בשינויים בשדות הטופס
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * פונקציה לאימות נתוני הטופס
   */
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return 'אנא מלא את כל השדות';
    }

    if (formData.name.length < 2) {
      return 'שם חייב להכיל לפחות 2 תווים';
    }

    if (!formData.email.includes('@')) {
      return 'אנא הכנס אימייל תקין';
    }

    if (formData.password.length < 6) {
      return 'סיסמה חייבת להכיל לפחות 6 תווים';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'הסיסמאות אינן תואמות';
    }

    return null;
  };

  /**
   * פונקציה לטיפול בשליחת הטופס
   * כרגע מדמה הרשמה מוצלחת - יחובר לשרת בעתיד
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const validationError = validateForm();
    if (validationError) {
      dispatch(loginFailure(validationError));
      return;
    }

    try {
      dispatch(loginStart());
      
      // קריאה לשרת להרשמת משתמש חדש
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'שגיאה בהרשמה');
      }

      // שמירת ה-token ב-localStorage
      localStorage.setItem('token', data.token);
      
      setSuccess(true);
      
      // אוטומטית מתחבר לאחר הרשמה מוצלחת
      const newUser = {
        id: data.user.id || data.user._id, // תמיכה בשני הפורמטים
        email: data.user.email,
        name: data.user.name,
      };
      
      dispatch(loginSuccess(newUser));
      
      // הפניה לדף הבית לאחר הרשמה מוצלחת
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      dispatch(loginFailure(error.message || 'שגיאה בהרשמה'));
    }
  };

  // אם ההרשמה הצליחה
  if (success) {
    return (
      <div className={styles.register}>
        <div className={styles.container}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✅</div>
            <h2 className={styles.successTitle}>הרשמה הושלמה בהצלחה!</h2>
            <p className={styles.successText}>
              ברוך הבא, {formData.name}!
              <br />
              אתה מועבר אוטומטית לדף הניהול...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.register}>
      <div className={styles.container}>
        <div className={styles.registerForm}>
          <h1 className={styles.title}>הרשמה</h1>
          <p className={styles.subtitle}>
            צור חשבון חדש כדי להתחיל לנהל את הנכסים שלך
          </p>

          {/* הצגת שגיאות */}
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* שדה שם */}
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                שם מלא
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="הכנס את השם המלא שלך"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>

            {/* שדה אימייל */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                כתובת אימייל
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="הכנס את האימייל שלך"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>

            {/* שדה סיסמה */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                סיסמה
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="הכנס סיסמה (לפחות 6 תווים)"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>

            {/* שדה אימות סיסמה */}
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                אימות סיסמה
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="הכנס את הסיסמה שוב"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>

            {/* כפתור הרשמה */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'נרשם...' : 'הרשמה'}
            </button>
          </form>

          {/* כפתור חזרה לדף הבית */}
          <div className={styles.backButton}>
            <Link to="/home" className={styles.backBtn}>
              ← חזור לדף הבית
            </Link>
          </div>

          {/* קישור לדף התחברות */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              כבר יש לך חשבון?{' '}
              <Link to="/login" className={styles.link}>
                התחבר כאן
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;