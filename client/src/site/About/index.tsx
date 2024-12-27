import React from "react"
import Menu from "../../components/Menu/index.tsx"
import Title from "../../components/Title/index.tsx"
import "./styles.css"

const About = () => {
    return (
        <>
            <Title />
            <Menu />
            <div className="about">
                <h1>About us</h1>
                <p>helpme.ai was born from the Civic Coding initiative.</p>
                <p>It is an AI-powered chatbot designed to bridge the gap in support for asylum seekers
        and refugees by providing immediate, centralized assistance in any language.</p>
                <p>Our chatbot is a non-profit project. It is free to use and does not collect any personal data.</p>
            </div>
        </>
    )
}

export default About
