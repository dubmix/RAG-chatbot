import React from 'react';
import Title from './components/Title.tsx';
import Menu from './components/Menu.tsx';
import Chat from './components/Chat.tsx';
import './styles/App.css';

function Main() {
  return (
    <>
      <Menu />
      <Title />
      <Chat />
    </>
  );
}

export default Main;