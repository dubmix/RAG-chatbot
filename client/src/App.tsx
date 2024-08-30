import React, { useState }from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.tsx';
import Chat from './Chat.tsx';
import Saved from './Saved.tsx';
import About from './About.tsx';
import './styles/app.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="outer-container">
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/chat' replace />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;