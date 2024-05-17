import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../Main.tsx';
import Saved from '../Saved.tsx';
import About from '../About.tsx';

function Content() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/chat' element={<Main/>} />
            <Route path='/saved' element={<Saved/>} />
            <Route path='/about' element={<About/>} />
        </Routes>
    </>
  );
}

export default Content;