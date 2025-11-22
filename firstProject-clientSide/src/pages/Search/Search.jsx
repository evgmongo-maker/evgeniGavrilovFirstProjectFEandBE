// Search page - דף תוצאות חיפוש
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import styles from './Search.module.css';

/**
 * Search Page Component
 * דף תוצאות חיפוש נכסים
 */
const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { properties } = useSelector((state) => state.properties);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  // קבלת query מה-URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    // סינון נכסים לפי החיפוש
    if (query.trim()) {
      const queryLower = query.toLowerCase();
      const filtered = properties.filter(property =>
        property.title?.toLowerCase().includes(queryLower) ||
        property.location?.toLowerCase().includes(queryLower) ||
        property.description?.toLowerCase().includes(queryLower)
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties);
    }
  }, [location.search, properties]);

  const handleNewSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={styles.search}>
      {/* Search Header */}
      <div className={styles.searchHeader}>
        <h1 className={styles.title}>
          {searchQuery ? `תוצאות חיפוש עבור: "${searchQuery}"` : 'כל הנכסים'}
        </h1>
        
        {/* Search Bar */}
        <form onSubmit={handleNewSearch} className={styles.searchForm}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חפש לפי עיר, שכונה או כתובת..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              חיפוש
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className={styles.results}>
        {filteredProperties.length > 0 ? (
          <>
            <p className={styles.resultCount}>
              נמצאו {filteredProperties.length} נכסים
            </p>
            <div className={styles.propertiesGrid}>
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  showActions={false} // אין אפשרות עריכה בדף חיפוש
                />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noResults}>
            <h3>לא נמצאו תוצאות</h3>
            <p>נסה לחפש במילות מפתח אחרות</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;