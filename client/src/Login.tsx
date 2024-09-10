import React, { useState } from 'react';
import './styles/login.css';
import './styles/global.css';
import { baseUrl } from './App.tsx';
import { useNavigate } from 'react-router-dom';


function Unlock({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch (`${baseUrl}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const result = await response.json();
            if (result.success) {
                localStorage.setItem('token', result.token);
                onLogin();
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        }
        setPassword('');
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <form id="messageForm" onSubmit={handleSubmit}>
                    <input 
                        id="messageInput"
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                    <button type="submit">Unlock App</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <button id="fade" className="home-button" onClick={() => navigate('/')}>
                  <img src="arrow_left.png" alt="Home" height="20" />
                </button>
            </div>
        </div>
    )
}

function Login({ onLogin }) {
  return (
    <>
      <Unlock onLogin={onLogin} />
    </>
  );
}

export default Login;