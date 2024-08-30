import React from 'react';
import Title from './components/Title.tsx';
import Unlock from './components/Unlock.tsx';

function Login({ onLogin }) {
  return (
    <>
      <Title />
      <Unlock onLogin={onLogin} />
    </>
  );
}

export default Login;