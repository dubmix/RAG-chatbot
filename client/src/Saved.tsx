import React from 'react';
import Menu from './components/Menu.tsx';
import Title from './components/Title.tsx';
import TableComponent from './components/SavedMessages.tsx';

function Saved() {
  return (
    <>
      <Title />
      <Menu />
      <TableComponent />
    </>
  );
}

export default Saved;