import React from 'react';
import '../styles/menu.css';


const Menu = () => {
    const [menuOpen, setMenuOpen] = React.useState(true);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
    <>
        <button id="menu-button" className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <img src="menu.png" alt="Menu" height="20" />
        </button>
        <div id="menu" className={`menu ${!menuOpen ? 'open' : ''}`}>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="chat">Chat</a></li>
                <li><a href="saved">Saved</a></li>
                <li><a href="about">About</a></li>
            </ul>
        </div>
    </>
    );
};

export default Menu;