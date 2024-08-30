import React, { useState } from 'react';

function Login({ onLogin }) {
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
        <form onSubmit={handleSubmit}>
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
             />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default Login;