// Home page - דף הבית בסגנון נדל"ן ישראלי
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Home.module.css';

/**
 * Home Page Component
 * דף הבית עם עיצוב מקצועי בסגנון נדל"ן ישראלי
 * כולל hero section ומידע על האפליקציה
 * נגיש לכולם - מחוברים ולא מחוברים
 */
const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            מצא את הנכס <span className={styles.highlight}>המושלם</span> עבורך
          </h1>
          <p className={styles.heroDescription}>
            הפלטפורמה המובילה בישראל לניהול נכסים חכם ומתקדם
            <br />
            <strong>מעל 10,000 נכסים</strong> פעילים ברחבי הארץ • <strong>דוחות מקצועיים</strong> • <strong>תמיכה 24/7</strong>
          </p>
          
          {/* Call to Action Button for Search */}
          <div className={styles.heroActions}>
            <Link to="/search" className={styles.heroButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              חפש נכסים עכשיו
            </Link>
            <Link to="/calculator" className={styles.heroButtonSecondary}>
              מחשבון משכנתא
            </Link>
          </div>
          
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>נכסים פעילים</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.statNumber}>5,000+</div>
              <div className={styles.statLabel}>משתמשים מרוצים</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.statNumber}>99.9%</div>
              <div className={styles.statLabel}>זמינות המערכת</div>
            </div>
          </div>
        </div>
      </section>

      {/* App Information Section */}
      <section className={styles.info}>
        <div className={styles.infoContent}>
          <h2 className={styles.infoTitle}>למה לבחור בנו?</h2>
          <p className={styles.infoSubtitle}>
            הפלטפורמה המתקדמת והמקצועית ביותר לניהול נכסים בישראל
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="#4a90e2" strokeWidth="2" fill="#f0f7ff"/>
                  <path d="M9 12L11 14L15 10" stroke="#4a90e2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>ניהול נכסים מתקדם</h3>
              <p className={styles.featureDescription}>
                פלטפורמה מקצועית לניהול תיק הנכסים שלך. עקוב אחר רווחיות, עדכן מחירים ונהל חוזי שכירות במקום אחד
              </p>
              <div className={styles.featureStats}>
                <span className={styles.stat}>✓ ניהול ללא הגבלה</span>
                <span className={styles.stat}>✓ דוחות מפורטים</span>
                <span className={styles.stat}>✓ התראות אוטומטיות</span>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="#4a90e2" strokeWidth="2" fill="#f0f7ff"/>
                  <path d="M21 21L16.65 16.65" stroke="#4a90e2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11" cy="11" r="3" stroke="#ff6b35" strokeWidth="2" fill="#fff5f2"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>חיפוש חכם ומתקדם</h3>
              <p className={styles.featureDescription}>
                מנוע חיפוש מתקדם עם פילטרים חכמים לפי עיר, שכונה, טווח מחירים, גודל נכס ועוד. מצא בדיוק מה שאתה מחפש
              </p>
              <div className={styles.featureStats}>
                <span className={styles.stat}>✓ חיפוש בזמן אמת</span>
                <span className={styles.stat}>✓ 15+ פילטרים</span>
                <span className={styles.stat}>✓ שמירת חיפושים</span>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="#4a90e2" strokeWidth="2" fill="#f0f7ff"/>
                  <circle cx="12" cy="12" r="2" stroke="#ff6b35" strokeWidth="2" fill="#fff5f2"/>
                  <path d="M6 6V4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V6" stroke="#4a90e2" strokeWidth="2"/>
                  <path d="M8 14H9M15 14H16" stroke="#4a90e2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>מחשבון משכנתא מדויק</h3>
              <p className={styles.featureDescription}>
                חשב משכנתא בצורה מדויקת עם התחשבות בכל הפרמטרים הרלוונטיים. קבל תמונה ברורה של העלויות החודשיות והכוללות
              </p>
              <div className={styles.featureStats}>
                <span className={styles.stat}>✓ חישוב מדויק 100%</span>
                <span className={styles.stat}>✓ התחשבות בהוצאות</span>
                <span className={styles.stat}>✓ השוואת תרחישים</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!isAuthenticated && (
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>מוכן להתחיל?</h2>
            <p className={styles.ctaDescription}>
              הצטרף אלינו היום ותתחיל לנהל את הנכסים שלך בצורה מקצועית
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/register" className={styles.ctaButton}>
                הרשמה עכשיו
              </Link>
              <Link to="/login" className={styles.ctaButtonSecondary}>
                יש לי חשבון
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;