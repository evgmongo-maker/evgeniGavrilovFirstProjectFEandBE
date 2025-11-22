// Loan Calculator component - מחשבון הלוואה
import { useState } from 'react';
import styles from './LoanCalculator.module.css';

/**
 * LoanCalculator Component
 * מחשבון הלוואה לחישוב תשלומים חודשיים
 * קלט: סכום הלוואה, ריבית שנתית, מספר שנים
 * פלט: תשלום חודשי, סך תשלומים, סך ריבית
 */
const LoanCalculator = () => {
  // State for calculator inputs
  const [loanAmount, setLoanAmount] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  
  // State for calculation results
  const [results, setResults] = useState(null);

  /**
   * פונקציה לחישוב הלוואה
   * נוסחה: M = P * [r(1+r)^n] / [(1+r)^n - 1]
   * M = תשלום חודשי, P = סכום הלוואה, r = ריבית חודשית, n = מספר תשלומים
   */
  const calculateLoan = () => {
    // Validation - בדיקת תקינות הקלט
    if (!loanAmount || !annualRate || !years) {
      alert('אנא מלא את כל השדות');
      return;
    }

    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(annualRate) / 100 / 12; // ריבית חודשית
    const numberOfPayments = parseInt(years) * 12; // מספר תשלומים

    // בדיקת תקינות מספרית
    if (principal <= 0 || monthlyRate < 0 || numberOfPayments <= 0) {
      alert('אנא הכנס ערכים תקינים');
      return;
    }

    // חישוב תשלום חודשי
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // חישוב סך התשלומים והריבית
    const totalPayments = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayments - principal;

    // שמירת התוצאות
    setResults({
      monthlyPayment: Math.round(monthlyPayment),
      totalPayments: Math.round(totalPayments),
      totalInterest: Math.round(totalInterest),
    });
  };

  /**
   * פונקציה לאיפוס המחשבון
   */
  const resetCalculator = () => {
    setLoanAmount('');
    setAnnualRate('');
    setYears('');
    setResults(null);
  };

  /**
   * פונקציה לעיצוב מספרים עם פסיקים
   */
  const formatNumber = (number) => {
    return number.toLocaleString('he-IL');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>מחשבון הלוואה לנכסים</h1>
        <p className={styles.description}>
          מחשבון מתקדם לחישוב תשלומי הלוואה חודשיים למשכנתא ונכסים.
          הכנס את פרטי ההלוואה וקבל חישוב מדויק של התשלומים החודשיים והעלויות הכוללות.
        </p>
      </div>

      <div className={styles.calculator}>
        <h2 className={styles.title}>פרטי ההלוואה</h2>
        
        <div className={styles.instructions}>
          <h3 className={styles.instructionsTitle}>איך להשתמש במחשבון?</h3>
          <ul className={styles.instructionsList}>
            <li>הכנס את <strong>סכום ההלוואה</strong> הרצוי בשקלים</li>
            <li>הזן את <strong>הריבית השנתית</strong> (לדוגמה: 3.5%)</li>
            <li>בחר את <strong>תקופת ההלוואה</strong> בשנים (בדרך כלל 15-30 שנה)</li>
            <li>לחץ על "חשב הלוואה" לקבלת התוצאות</li>
          </ul>
        </div>
        
        <div className={styles.form}>
        {/* שדה סכום הלוואה */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            סכום ההלוואה (₪)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="לדוגמה: 1000000"
            className={styles.input}
            min="0"
          />
        </div>

        {/* שדה ריבית שנתית */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            ריבית שנתית (%)
          </label>
          <input
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            placeholder="לדוגמה: 3.5"
            className={styles.input}
            min="0"
            step="0.1"
          />
        </div>

        {/* שדה מספר שנים */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            תקופת ההלוואה (שנים)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="לדוגמה: 25"
            className={styles.input}
            min="1"
            max="50"
          />
        </div>

        {/* כפתורי פעולה */}
        <div className={styles.buttons}>
          <button
            onClick={calculateLoan}
            className={`${styles.button} ${styles.calculateBtn}`}
          >
            חשב הלוואה
          </button>
          <button
            onClick={resetCalculator}
            className={`${styles.button} ${styles.resetBtn}`}
          >
            איפוס
          </button>
        </div>
      </div>

      {/* הצגת תוצאות */}
      {results && (
        <div className={styles.results}>
          <h3 className={styles.resultsTitle}>תוצאות החישוב</h3>
          
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>תשלום חודשי:</span>
            <span className={styles.resultValue}>
              ₪{formatNumber(results.monthlyPayment)}
            </span>
          </div>
          
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>סך כל התשלומים:</span>
            <span className={styles.resultValue}>
              ₪{formatNumber(results.totalPayments)}
            </span>
          </div>
          
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>סך הריבית:</span>
            <span className={`${styles.resultValue} ${styles.interest}`}>
              ₪{formatNumber(results.totalInterest)}
            </span>
          </div>
        </div>
      )}
      </div>

      <div className={styles.footer}>
        <div className={styles.tips}>
          <h3 className={styles.tipsTitle}>טיפים חשובים:</h3>
          <ul className={styles.tipsList}>
            <li><strong>ריבית נמוכה יותר</strong> = תשלום חודשי נמוך יותר</li>
            <li><strong>תקופה קצרה יותר</strong> = פחות ריבית כוללת</li>
            <li><strong>תקופה ארוכה יותר</strong> = תשלום חודשי נמוך יותר</li>
            <li>קח בחשבון הוצאות נוספות כמו ביטוח ואגרות</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;