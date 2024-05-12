import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Saved from './Saved.tsx';
import Content from './components/Content.tsx';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Content />
      </Router>
    </div>
  );
};

export default App;