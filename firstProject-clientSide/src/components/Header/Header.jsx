// Header component - כותרת עליונה עם ניווט בסגנון נדל"ן ישראלי
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import styles from './Header.module.css';

/**
 * Header Component
 * כותרת עליונה בעיצוב מקצועי עם לוגו, תפריט ניווט ומידע משתמש
 * כולל פעמון התראות ואייקון משתמש עגול
 */
const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  /**
   * פונקציה לטיפול בהתנתקות משתמש
   */
  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
    setShowUserMenu(false);
  };

  /**
   * פונקציה לטיפול בקליק על עיגול המשתמש
   */
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  /**
   * סגירת התפריט כשלוחצים מחוץ לו
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(`.${styles.userWrapper}`)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  /**
   * פונקציה לקבלת האות הראשונה של השם למעגל המשתמש
   */
  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'א';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Right side - Logo */}
        <div className={styles.logo}>
          <Link to={isAuthenticated ? "/dashboard" : "/home"} className={styles.logoLink}>
            <span className={styles.title}>נדל"ן ישראלי</span>
          </Link>
        </div>

        {/* Center - Navigation menu */}
        <nav className={styles.nav}>
          <Link to={isAuthenticated ? "/dashboard" : "/home"} className={styles.navLink}>
            {isAuthenticated ? "לוח ראשי" : "דף הבית"}
          </Link>
          <Link to="/search" className={styles.navLink}>
            חיפוש נכסים
          </Link>
          {isAuthenticated && (
            <Link to="/update" className={styles.navLink}>
              פרסם נכס
            </Link>
          )}
          <Link to="/calculator" className={styles.navLink}>
            מחשבון משכנתא
          </Link>
        </nav>

        {/* Left side - User actions and notifications */}
        <div className={styles.rightSection}>
          {isAuthenticated ? (
            <>
              <span className={styles.userName}>{user?.name || user?.email || 'משתמש'}</span>
              
              {/* Notification bell */}
              <div className={styles.notificationBell} title="התראות">
                <span className={styles.bellIcon}>🔔</span>
                <span className={styles.notificationBadge}>1</span>
              </div>
              
              {/* User circle with dropdown menu */}
              <div className={styles.userWrapper}>
                <div 
                  className={styles.userCircle} 
                  title={user?.name || user?.email || 'משתמש'} 
                  onClick={toggleUserMenu}
                >
                  <span className={styles.userInitial}>{getUserInitial()}</span>
                </div>
                
                {/* Dropdown menu */}
                {showUserMenu && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <span className={styles.userFullName}>
                        {user?.name || user?.email || 'משתמש'}
                      </span>
                      <span className={styles.userEmail}>
                        {user?.email}
                      </span>
                    </div>
                    <hr className={styles.divider} />
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                      🚪 התנתק
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginBtn}>
                התחבר
              </Link>
              <Link to="/register" className={styles.registerBtn}>
                הרשמה
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;