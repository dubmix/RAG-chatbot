import React, { useState, useEffect }from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './Chat.tsx';
import Saved from './Saved.tsx';
import About from './About.tsx';
import Login from './Login.tsx';
import './styles/app.css';

const TIMEOUT = 30 * 1000;
const VALIDATION_INTERVAL = 5 * 1000;
export const apiBaseHost = process.env.REACT_APP_BASE_URL || 'http://0.0.0.0';
export const apiBasePort = process.env.REACT_APP_BASE_PORT || '8080';

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
        await fetch(`${apiBaseHost}:${apiBasePort}/api/logout`, {
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
    console.log(`${apiBaseHost}:${apiBasePort}`)
    if (token) {
      try {
        const response = await fetch(`${apiBaseHost}:${apiBasePort}/api/protected?token=${token}`);
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
    <div className="outer-container">
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path='/' element={<Navigate to='/chat' replace />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/saved' element={<Saved />} />
              <Route path='/about' element={<About />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;