import React from 'react';
import Title from './components/Title.tsx';
import Menu from './components/Menu.tsx';
import ChatBox from './components/ChatBox.tsx';

function Chat() {
  return (
    <>
      <Menu />
      <Title />
      <ChatBox />
    </>
  );
}

export default Chat;