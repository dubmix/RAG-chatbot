import React, { useState, useEffect } from "react"
import "./styles.css"
import { baseUrl } from "../../site/index.tsx"


const Title: React.FC = () => {
    const [title, setTitle] = useState<string>("Loading...")

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/title`)
                if (response.ok) {
                    const data = await response.json()
                    setTitle(data.title)
                } else {
                    console.error("Error fetching title: ", response.status)
                }
            } catch (error) {
                console.error("Error fetching title: ", error)
            }
        }

        fetchTitle()
    }, [])

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="title">
                        <div className="image-container">
                            <img src="hilfy.png" alt="logo" height="170" />
                        </div>
                        <div className="title-container">
                            <h1 id="title">{title}</h1>
                        </div>
                    </div>
                    <div className="header">
                        <h1>Create your own personalized smart assistant.</h1>
                    </div>
                    <a style={{ width: "50px" }} className="try-me" href="chat">Try It</a>
                </div>
            </div>
        </>
    )
}

export default Title
