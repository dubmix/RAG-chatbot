import React, { useState, useEffect } from 'react';
import '../styles/title.css'
import { baseUrl } from '../App.tsx';


const Title: React.FC = () => {
    const [title, setTitle] = useState<string>('Loading...');

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/title`);
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
    <div className="title">
        <div className="image-container">
            <img src="hilfy.png" alt="Picture" height="170" />
        </div>

        <div className="title-container">
            <h1 id="title">{title}</h1>
        </div>
        <div className="header">
            <h1>Lorem Ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>   
        </div>
    </div>
    </>
  );
};

export default Title;