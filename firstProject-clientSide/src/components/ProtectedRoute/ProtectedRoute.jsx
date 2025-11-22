// ProtectedRoute component - הגנה על routes שדורשות authentication
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * מגן על routes שדורשות התחברות
 * אם המשתמש לא מחובר - מפנה לדף התחברות
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;