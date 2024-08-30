import React, { useState, useEffect }from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.tsx';
import Chat from './Chat.tsx';
import Saved from './Saved.tsx';
import About from './About.tsx';
import './styles/app.css';

const TIMEOUT = 30 * 1000;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    resetTimeout();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
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

  const handleUserActivity = () => {
    resetTimeout();
  };

  useEffect(() => {
    if (isAuthenticated) {
      resetTimeout();
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
      return () => {
        window.removeEventListener('mousemove', handleUserActivity);
        window.removeEventListener('keydown', handleUserActivity);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    }
  }, [isAuthenticated]);

  // if (!isAuthenticated) {
  //   return <Login onLogin={() => setIsAuthenticated(true)} />;
  // }

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