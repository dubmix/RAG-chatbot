import React from "react"
import "../styles/menu.css"


const Menu = () => {
    const [menuOpen, setMenuOpen] = React.useState(true)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <>
            <button id="menu-button" className={`menu-button ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
                <img src="menu.png" alt="Menu" height="20" />
            </button>
            <div id="menu" className={`menu ${!menuOpen ? "open" : ""}`}>
                <ul>
                    <li>
                        <img src="home_logo.png" alt="Home" height="17" />
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <img src="chat_logo.png" alt="Home" height="17" />
                        <a href="chat">Chat</a>
                    </li>
                    <li>
                        <img src="star_logo.png" alt="Home" height="17" />
                        <a href="saved">Saved</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Menu
