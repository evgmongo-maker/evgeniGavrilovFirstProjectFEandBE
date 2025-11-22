// Main App component - נקודת הכניסה לאפליקציית נכסים בישראל
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import PropertyForm from './pages/PropertyForm/PropertyForm';
import LoanCalculator from './components/LoanCalculator/LoanCalculator';
import './App.css'

/**
 * Layout Component - מחליט מתי להציג את ה-Header
 */
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/register'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div className="app" dir="rtl">
      {shouldShowHeader && <Header />}
      <main className={shouldShowHeader ? "main-content" : "full-content"}>
        {children}
      </main>
    </div>
  );
};

/**
 * Main App Component
 * מגדיר את הניתוב הראשי ומעטף את האפליקציה ב-Redux Provider
 * תמיכה ב-RTL לעברית
 */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/update" element={
              <ProtectedRoute>
                <PropertyForm />
              </ProtectedRoute>
            } />
            <Route path="/update/:id" element={
              <ProtectedRoute>
                <PropertyForm isEdit={true} />
              </ProtectedRoute>
            } />
            <Route path="/calculator" element={<LoanCalculator />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App
