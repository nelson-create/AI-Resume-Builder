import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * ProtectedRoute component that ensures only authenticated users can access a route
 * Checks for JWT token and user data in localStorage
 * Redirects unauthenticated users to the login page
 */
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated by verifying token in localStorage
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        // User is authenticated if both token and user data exist and are valid
        if (token && user) {
          try {
            // Validate that user is valid JSON
            JSON.parse(user);
            setIsAuthenticated(true);
          } catch (e) {
            console.error('Invalid user data in localStorage');
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3d4a5c] border-t-[#60a5fa] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#cbd5e1] text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the component
  return children;
};

export default ProtectedRoute;

