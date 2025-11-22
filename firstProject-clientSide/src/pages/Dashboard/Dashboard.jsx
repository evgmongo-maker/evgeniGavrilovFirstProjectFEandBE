// Dashboard page - דף ניהול הנכסים
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchPropertiesStart, 
  fetchPropertiesSuccess, 
  fetchPropertiesFailure,
  addProperty, 
  updateProperty 
} from '../../store/propertySlice';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import LoanCalculator from '../../components/LoanCalculator/LoanCalculator';
import styles from './Dashboard.module.css';

/**
 * Dashboard Page Component
 * דף ניהול נכסים - מציג רשימת נכסים, טופס הוספה ומחשבון הלוואה
 * זמין רק למשתמשים מחוברים
 */
const Dashboard = () => {
  const { properties } = useSelector((state) => state.properties);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // State לטופס הוספת/עריכת נכס
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    status: 'זמין',
  });

  // State למחשבון הלוואה
  const [showCalculator, setShowCalculator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * טעינת נכסים מהשרת בעת טעינת הקומפוננטה
   */
  useEffect(() => {
    const loadProperties = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        dispatch(fetchPropertiesStart());
        const response = await fetch('http://localhost:5000/api/properties', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('שגיאה בטעינת הנכסים');
        }

        const data = await response.json();
        dispatch(fetchPropertiesSuccess(data.properties));
      } catch (error) {
        console.error('שגיאה בטעינת נכסים:', error);
        dispatch(fetchPropertiesFailure(error.message));
        setError(error.message);
      }
    };

    loadProperties();
  }, [dispatch]);

  /**
   * פונקציה לטיפול בשינויים בטופס
   */
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * פונקציה לפתיחת טופס הוספת נכס חדש
   */
  const handleAddNew = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      price: '',
      location: '',
      description: '',
      status: 'זמין',
    });
    setShowForm(true);
  };

  /**
   * פונקציה לפתיחת טופס עריכת נכס
   */
  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      price: property.price,
      location: property.location,
      description: property.description,
      status: property.status,
    });
    setShowForm(true);
  };

  /**
   * פונקציה לשליחת הטופס - שולחת לשרת
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation בסיסי
    if (!formData.title || !formData.price || !formData.location) {
      setError('אנא מלא את כל השדות הנדרשים');
      return;
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('אנא הכנס מחיר תקין');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('אין הרשאה - אנא התחבר מחדש');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const propertyData = {
        title: formData.title,
        price: parseFloat(formData.price),
        location: formData.location,
        description: formData.description || '',
        status: formData.status || 'זמין',
      };

      if (editingProperty) {
        // עדכון נכס קיים - PUT request
        const response = await fetch(`http://localhost:5000/api/properties/${editingProperty.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(propertyData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'שגיאה בעדכון הנכס');
        }

        const data = await response.json();
        dispatch(updateProperty({ id: editingProperty.id, ...data.property }));
      } else {
        // הוספת נכס חדש - POST request
        const response = await fetch('http://localhost:5000/api/properties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(propertyData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'שגיאה בהוספת הנכס');
        }

        const data = await response.json();
        dispatch(addProperty(data.property));
      }

      // איפוס הטופס
      setShowForm(false);
      setEditingProperty(null);
      setFormData({
        title: '',
        price: '',
        location: '',
        description: '',
        status: 'זמין',
      });
    } catch (error) {
      console.error('שגיאה בשמירת נכס:', error);
      setError(error.message || 'שגיאה בשמירת הנכס');
    } finally {
      setLoading(false);
    }
  };

  /**
   * פונקציה לביטול עריכה
   */
  const handleCancel = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          שלום {user?.name}, ברוך הבא לדף הניהול שלך
        </h1>
        <p className={styles.subtitle}>
          כאן תוכל לנהל את כל הנכסים שלך, להוסיף נכסים חדשים ולחשב הלוואות
        </p>
      </div>

      {/* Action buttons */}
      <div className={styles.actions}>
        <button
          onClick={handleAddNew}
          className={`${styles.btn} ${styles.addBtn}`}
        >
          ➕ הוסף נכס חדש
        </button>
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className={`${styles.btn} ${styles.calculatorBtn}`}
        >
          🧮 {showCalculator ? 'הסתר' : 'הצג'} מחשבון הלוואה
        </button>
      </div>

      {/* Loan Calculator */}
      {showCalculator && (
        <div className={styles.calculatorSection}>
          <LoanCalculator />
        </div>
      )}

      {/* Property Form */}
      {showForm && (
        <div className={styles.formOverlay}>
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>
              {editingProperty ? 'עריכת נכס' : 'הוספת נכס חדש'}
            </h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>כותרת הנכס *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="לדוגמה: דירת 4 חדרים בתל אביב"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>מחיר (₪) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  placeholder="לדוגמה: 2500000"
                  className={styles.input}
                  required
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>מיקום *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="לדוגמה: תל אביב, רחוב דיזנגוף 123"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>סטטוס</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className={styles.select}
                >
                  <option value="זמין">זמין</option>
                  <option value="נמכר">נמכר</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>תיאור</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="תיאור מפורט של הנכס..."
                  className={styles.textarea}
                  rows="4"
                />
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>
                  {editingProperty ? 'עדכן נכס' : 'הוסף נכס'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={`${styles.btn} ${styles.cancelBtn}`}
                >
                  ביטול
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {/* Properties List */}
      <div className={styles.propertiesSection}>
        <h2 className={styles.sectionTitle}>
          הנכסים שלי ({properties.length})
        </h2>
        
        {properties.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🏠</div>
            <h3 className={styles.emptyTitle}>אין נכסים עדיין</h3>
            <p className={styles.emptyText}>
              התחל על ידי הוספת הנכס הראשון שלך
            </p>
            <button
              onClick={handleAddNew}
              className={`${styles.btn} ${styles.addBtn}`}
            >
              ➕ הוסף נכס ראשון
            </button>
          </div>
        ) : (
          <div className={styles.propertiesGrid}>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;