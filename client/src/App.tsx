import React, { useState, useEffect }from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Chat from './Chat.tsx';
import Saved from './Saved.tsx';
import About from './About.tsx';
import Login from './Login.tsx';
import Home from './Home.tsx';
import './styles/app.css';

const TIMEOUT = 30 * 1000;
const VALIDATION_INTERVAL = 5 * 1000;
// @ts-ignore
const apiBaseHost = process.env.REACT_APP_BASE_URL || 'https://hilfy.co';
// @ts-ignore
const apiBasePort = process.env.REACT_APP_BASE_PORT || '';
export const baseUrl = `${apiBaseHost}${apiBasePort}`;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    resetTimeout();
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${baseUrl}/api/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
      } catch (error) {
        console.error('Logout failed: ', error);
      }
    }
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      handleLogout();
    }, TIMEOUT);
    setTimeoutId(id);
  };

  const validateSession = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${baseUrl}/api/protected?token=${token}`);
        if (!response.ok) {
          handleLogout();
        }
      } catch {
        handleLogout();
      }
    }
  };

  const handleUserActivity = () => {
    resetTimeout();
  };

  useEffect(() => {
    if (isAuthenticated) {
      resetTimeout();
      const intervalId = setInterval(validateSession, VALIDATION_INTERVAL);
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
      return () => {
        window.removeEventListener('mousemove', handleUserActivity);
        window.removeEventListener('keydown', handleUserActivity);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        clearInterval(intervalId);
      }
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
    </Router>
  );
};

const AppContent = ({ isAuthenticated, handleLogin }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div>
      <div className={!isAuthenticated && !isHome ? 'blurred-background' : ''}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
        {!isAuthenticated && !isHome && (
          <div className="login-overlay">
            <Login onLogin={handleLogin} />
          </div>
        )}
      </div>
  );
};

export default App;