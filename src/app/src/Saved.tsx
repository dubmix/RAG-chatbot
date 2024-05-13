import React from 'react';
import Menu from './components/Menu.tsx';
import Title from './components/Title.tsx';
import TableComponent from './components/SavedMessages.tsx';

function Saved() {
  return (
    <div>
      <Title />
      <Menu />
      <TableComponent />
    </div>
  );
}

export default Saved;