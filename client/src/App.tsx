import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content.tsx';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Content />
      </Router>
    </>
  );
};

export default App;