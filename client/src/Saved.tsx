import React from 'react';
import Menu from './components/Menu.tsx';
import Title from './components/Title.tsx';
import SavedBox from './components/SavedBox.tsx';

function Saved() {
  return (
    <>
      <Title />
      <Menu />
      <SavedBox />
    </>
  );
}

export default Saved;