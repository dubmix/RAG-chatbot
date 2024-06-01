import React, { useState, useEffect } from 'react';
import '../styles/title.css'

const Title: React.FC = () => {
    const [title, setTitle] = useState<string>('Loading...');

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8080/api/title');
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