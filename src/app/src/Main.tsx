import React from 'react';
import Title from './components/Title.tsx';
import Menu from './components/Menu.tsx';
import Chat from './components/Chat.tsx';

function Main() {
  return (
    <div>
      <Menu />
      <Title />
      <Chat />
    </div>
  );
}

export default Main;