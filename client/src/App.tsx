import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content.tsx';
import './styles/app.css';

const App: React.FC = () => {
  return (
    <div className="outer-container">
      <Router>
        <Content />
      </Router>
    </div>
  );
};

export default App;