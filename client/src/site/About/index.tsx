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
            </div>
        </>
    )
}

export default About
