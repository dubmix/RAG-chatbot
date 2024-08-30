import React, { useState } from 'react';
import '../styles/login.css';
import '../styles/global.css';
import Title from './Title.tsx';

function Unlock({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch ('http://127.0.0.1:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        const result = await response.json();
        if (result.success) {
            onLogin();
        } else {
            setError(result.message);
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
            </div>
        </div>
    )
}

export default Unlock;