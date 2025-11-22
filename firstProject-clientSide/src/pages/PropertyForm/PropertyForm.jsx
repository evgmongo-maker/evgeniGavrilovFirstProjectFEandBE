// PropertyForm page - דף הוספה/עריכה של נכס
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addProperty, updateProperty } from '../../store/propertySlice';
import styles from './PropertyForm.module.css';

/**
 * PropertyForm Component
 * טופס להוספה או עריכה של נכס עם validation מלא
 */
const PropertyForm = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { properties } = useSelector((state) => state.properties);
  
  // מצא את הנכס לעריכה
  const propertyToEdit = isEdit && id ? properties.find(p => p.id.toString() === id) : null;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'למכירה',
    bedrooms: '',
    bathrooms: '',
    area: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // טען את נתוני הנכס לעריכה
  useEffect(() => {
    if (isEdit && propertyToEdit) {
      setFormData({
        title: propertyToEdit.title || '',
        description: propertyToEdit.description || '',
        price: propertyToEdit.price?.toString() || '',
        location: propertyToEdit.location || '',
        type: propertyToEdit.type || 'למכירה',
        bedrooms: propertyToEdit.bedrooms?.toString() || '',
        bathrooms: propertyToEdit.bathrooms?.toString() || '',
        area: propertyToEdit.area?.toString() || '',
        image: propertyToEdit.image || ''
      });
    }
  }, [isEdit, propertyToEdit]);

  /**
   * פונקציה לטיפול בשינויים בטופס
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * פונקציה לvalidation של הטופס
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'כותרת נדרשת';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'תיאור נדרש';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'מחיר חייב להיות חיובי';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'מיקום נדרש';
    }

    if (!formData.bedrooms || formData.bedrooms <= 0) {
      newErrors.bedrooms = 'מספר חדרים חייב להיות חיובי';
    }

    if (!formData.bathrooms || formData.bathrooms <= 0) {
      newErrors.bathrooms = 'מספר שירותים חייב להיות חיובי';
    }

    if (!formData.area || formData.area <= 0) {
      newErrors.area = 'שטח חייב להיות חיובי';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * פונקציה לטיפול בשליחת הטופס - מחובר לשרת MongoDB
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrors({ general: 'אין הרשאה - אנא התחבר מחדש' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const propertyData = {
        title: formData.title.trim(),
        price: parseFloat(formData.price),
        location: formData.location.trim(),
        description: formData.description.trim() || '',
        status: formData.status || 'זמין',
      };

      if (isEdit && propertyToEdit) {
        // עדכון נכס קיים - PUT request
        const response = await fetch(`http://localhost:5000/api/properties/${propertyToEdit.id}`, {
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
        dispatch(updateProperty({ id: propertyToEdit.id, ...data.property }));
        setSuccessMessage('הנכס עודכן בהצלחה!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
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
        setSuccessMessage('הנכס נוסף בהצלחה!');
        
        // Reset form for new property
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          type: 'למכירה',
          bedrooms: '',
          bathrooms: '',
          area: '',
          image: ''
        });
      }
    } catch (error) {
      console.error('שגיאה בשמירת נכס:', error);
      setErrors({ general: error.message || 'שגיאה בשמירת הנכס' });
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className={styles.propertyForm}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {isEdit ? 'עריכת נכס' : 'פרסום נכס חדש'}
        </h1>

        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className={styles.errorMessage}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* כותרת */}
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              כותרת הנכס *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`${styles.input} ${errors.title ? styles.error : ''}`}
              placeholder="לדוגמה: דירת 4 חדרים בתל אביב"
            />
            {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
          </div>

          {/* תיאור */}
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              תיאור הנכס *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
              placeholder="תאר את הנכס בפירוט..."
              rows="4"
            />
            {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
          </div>

          {/* מחיר ומיקום */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>
                מחיר *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`${styles.input} ${errors.price ? styles.error : ''}`}
                placeholder="0"
              />
              {errors.price && <span className={styles.errorMessage}>{errors.price}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location" className={styles.label}>
                מיקום *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`${styles.input} ${errors.location ? styles.error : ''}`}
                placeholder="עיר, שכונה"
              />
              {errors.location && <span className={styles.errorMessage}>{errors.location}</span>}
            </div>
          </div>

          {/* סוג עסקה */}
          <div className={styles.formGroup}>
            <label htmlFor="type" className={styles.label}>
              סוג עסקה
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="למכירה">למכירה</option>
              <option value="להשכרה">להשכרה</option>
              <option value="להשכרה לטווח קצר">להשכרה לטווח קצר</option>
            </select>
          </div>

          {/* פרטי הנכס */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="bedrooms" className={styles.label}>
                מספר חדרים *
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className={`${styles.input} ${errors.bedrooms ? styles.error : ''}`}
                placeholder="0"
                min="1"
              />
              {errors.bedrooms && <span className={styles.errorMessage}>{errors.bedrooms}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bathrooms" className={styles.label}>
                מספר שירותים *
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className={`${styles.input} ${errors.bathrooms ? styles.error : ''}`}
                placeholder="0"
                min="1"
              />
              {errors.bathrooms && <span className={styles.errorMessage}>{errors.bathrooms}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="area" className={styles.label}>
                שטח (מ״ר) *
              </label>
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={`${styles.input} ${errors.area ? styles.error : ''}`}
                placeholder="0"
                min="1"
              />
              {errors.area && <span className={styles.errorMessage}>{errors.area}</span>}
            </div>
          </div>

          {/* תמונה */}
          <div className={styles.formGroup}>
            <label htmlFor="image" className={styles.label}>
              קישור לתמונה
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={styles.input}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* כפתורי פעולה */}
          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'שומר...' : (isEdit ? 'עדכן נכס' : 'פרסם נכס')}
            </button>
            <button 
              type="button" 
              className={styles.cancelBtn}
              onClick={() => navigate(-1)}
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;