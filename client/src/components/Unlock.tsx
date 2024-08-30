import React, { useState } from 'react';
import '../styles/login.css';
import '../styles/global.css';

const apiBaseHost = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1';
const apiBasePort = process.env.REACT_APP_PORT || '8080';

function Unlock({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch ('${apiBaseHost}:${apiBasePort}/api/login', {
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