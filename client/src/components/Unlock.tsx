import React, { useState } from 'react';
import '../styles/login.css';
import '../styles/global.css';
import { apiBaseHost, apiBasePort } from '../App.tsx';


function Unlock({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    console.log(`${apiBaseHost}:${apiBasePort}`)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch (`${apiBaseHost}:${apiBasePort}/api/login`, {
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
            </div>
        </div>
    )
}

export default Unlock;