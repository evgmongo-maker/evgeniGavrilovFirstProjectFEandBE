// PropertyCard component - כרטיס נכס
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProperty, updatePropertyStatus } from '../../store/propertySlice';
import styles from './PropertyCard.module.css';

/**
 * PropertyCard Component
 * מציג פרטי נכס בכרטיס עם אפשרויות עריכה ומחיקה
 * כולל כפתורי פעולה ועיצוב responsive
 */
const PropertyCard = ({ property, showActions = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * פונקציה לעריכת נכס
   */
  const handleEdit = () => {
    navigate(`/update/${property.id}`);
  };

  /**
   * פונקציה למחיקת נכס - שולחת לשרת
   */
  const handleDelete = async () => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את הנכס?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('אין הרשאה - אנא התחבר מחדש');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/properties/${property.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'שגיאה במחיקת הנכס');
      }

      // מחיקה מ-Redux אחרי הצלחה
      dispatch(deleteProperty(property.id));
    } catch (error) {
      console.error('שגיאה במחיקת נכס:', error);
      alert(error.message || 'שגיאה במחיקת הנכס');
    }
  };

  /**
   * פונקציה לשינוי סטטוס נכס - שולחת לשרת
   */
  const handleStatusChange = async () => {
    const newStatus = property.status === 'זמין' ? 'נמכר' : 'זמין';
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('אין הרשאה - אנא התחבר מחדש');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/properties/${property.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'שגיאה בעדכון הסטטוס');
      }

      // עדכון ב-Redux אחרי הצלחה
      dispatch(updatePropertyStatus({ id: property.id, status: newStatus }));
    } catch (error) {
      console.error('שגיאה בעדכון סטטוס:', error);
      alert(error.message || 'שגיאה בעדכון הסטטוס');
    }
  };

  /**
   * פונקציה לעיצוב מחיר עם פסיקים
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('he-IL').format(price);
  };

  /**
   * פונקציה לקביעת סגנון סטטוס
   */
  const getStatusClass = (status) => {
    return status === 'זמין' ? styles.statusAvailable : styles.statusSold;
  };

  return (
    <div className={styles.propertyCard}>
      {/* Header with status */}
      <div className={styles.header}>
        <h3 className={styles.title}>{property.title}</h3>
        <span className={`${styles.status} ${getStatusClass(property.status)}`}>
          {property.status}
        </span>
      </div>

      {/* Property details */}
      <div className={styles.details}>
        <div className={styles.price}>
          <span className={styles.priceLabel}>מחיר:</span>
          <span className={styles.priceValue}>
            ₪{formatPrice(property.price)}
          </span>
        </div>

        <div className={styles.location}>
          <span className={styles.locationIcon}>📍</span>
          <span className={styles.locationText}>{property.location}</span>
        </div>

        {property.description && (
          <div className={styles.description}>
            <p className={styles.descriptionText}>
              {property.description.length > 100
                ? `${property.description.substring(0, 100)}...`
                : property.description}
            </p>
          </div>
        )}

        <div className={styles.metadata}>
          <span className={styles.date}>
            נוצר: {new Date(property.createdAt).toLocaleDateString('he-IL')}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      {showActions && (
        <div className={styles.actions}>
          <button
            onClick={handleEdit}
            className={`${styles.btn} ${styles.editBtn}`}
            title="ערוך נכס"
          >
            ✏️ ערוך
          </button>

          <button
            onClick={handleStatusChange}
            className={`${styles.btn} ${styles.statusBtn}`}
            title={`סמן כ${property.status === 'זמין' ? 'נמכר' : 'זמין'}`}
          >
            {property.status === 'זמין' ? '✅ סמן כנמכר' : '🔄 סמן כזמין'}
          </button>

          <button
            onClick={handleDelete}
            className={`${styles.btn} ${styles.deleteBtn}`}
            title="מחק נכס"
          >
            🗑️ מחק
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;