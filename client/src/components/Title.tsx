import React, { useState, useEffect } from 'react';
import '../styles/title.css'

const apiBaseHost = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1';
const apiBasePort = process.env.REACT_APP_PORT || '8080';

const Title: React.FC = () => {
    const [title, setTitle] = useState<string>('Loading...');

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await fetch(`${apiBaseHost}:${apiBasePort}/api/title`);
                if (response.ok) {
                    const data = await response.json();
                    setTitle(data.title);
                } else {
                    console.error('Error fetching title: ', response.status);
                }
            } catch (error) {
                console.error('Error fetching title: ', error);
            }
        };

        fetchTitle();
    }, []);

  return (
    <>
        <div className="image-container">
            <img src="helpme.ai.png" alt="Picture" height="100" />
        </div>

        <div className="title-container">
            <h1 id="title">{title}</h1>
        </div>
    </>
  );
};

export default Title;