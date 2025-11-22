// Login page - דף התחברות
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import styles from './Login.module.css';

/**
 * Login Page Component
 * דף התחברות עם טופס אימייל וסיסמה
 * כולל validation בסיסי וחיבור ל-Redux
 */
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
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
   * פונקציה לטיפול בשליחת הטופס
   * מחובר לשרת MongoDB
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation בסיסי
    if (!formData.email || !formData.password) {
      dispatch(loginFailure('אנא מלא את כל השדות'));
      return;
    }

    if (!formData.email.includes('@')) {
      dispatch(loginFailure('אנא הכנס אימייל תקין'));
      return;
    }

    try {
      dispatch(loginStart());
      
      // קריאה לשרת להתחברות
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'שגיאה בהתחברות');
      }

      // שמירת ה-token ב-localStorage
      localStorage.setItem('token', data.token);
      
      // עדכון state עם פרטי המשתמש
      const user = {
        id: data.user.id || data.user._id,
        email: data.user.email,
        name: data.user.name,
      };
      
      dispatch(loginSuccess(user));
      navigate('/dashboard');
      
    } catch (error) {
      dispatch(loginFailure(error.message || 'שגיאה בהתחברות'));
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.loginForm}>
          <h1 className={styles.title}>התחברות</h1>
          <p className={styles.subtitle}>
            הכנס את פרטיך כדי להתחבר למערכת
          </p>

          {/* הודעה - התחבר עם משתמש שנרשם */}
          <div className={styles.demoInfo}>
            <strong>💡 הערה:</strong><br />
            התחבר עם משתמש שנרשם במערכת<br />
            או <Link to="/register" className={styles.link}>הירשם כאן</Link>
          </div>

          {/* הצגת שגיאות */}
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
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
                placeholder="הכנס את הסיסמה שלך"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>

            {/* כפתור התחברות */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'מתחבר...' : 'התחבר'}
            </button>
          </form>

          {/* כפתור חזרה לדף הבית */}
          <div className={styles.backButton}>
            <Link to="/home" className={styles.backBtn}>
              ← חזור לדף הבית
            </Link>
          </div>

          {/* קישור לדף הרשמה */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              עדיין לא רשום?{' '}
              <Link to="/register" className={styles.link}>
                הרשמה כאן
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;