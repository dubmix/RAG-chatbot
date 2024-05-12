import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../Main.tsx';
import Saved from '../Saved.tsx';

function Content() {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage('fadeOut');
  }, [location, displayLocation]);

  return (
    <div
        className={`${transitionStage}`}
        onAnimationEnd={() => {
            if (transitionStage === 'fadeOut') {
                setTransitionStage('fadeIn');
                setDisplayLocation(location);
            }
        }}
    >
        <Routes location={displayLocation}>
            <Route path='/' element={<Main/>} />
            <Route path='/chat' element={<Main/>} />
            <Route path='/saved' element={<Saved/>} />
        </Routes>
    </div>
  );
}

export default Content;