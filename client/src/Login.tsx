import React, { useState } from "react"
import "./styles/login.css"
import "./styles/global.css"
import { baseUrl } from "./App.tsx"
import { useNavigate } from "react-router-dom"
import { useSiteContext } from "./contexts/siteContext.tsx"


const Login: React.FC = () => {
    const [password, setPassword] = useState("")
    const { updateAccessToken, updateIsAuthenticated } = useSiteContext()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch (`${baseUrl}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ "username": "admin", "password": password }),
            })

            const result = await response.json()
            const form = document.getElementById("messageFormBis") as HTMLFormElement | null

            if (response.ok) {
                updateAccessToken(result.access_token)
                updateIsAuthenticated(true)
                return
            } else {
                if (form) {
                    form.classList.add("shake")
                    setTimeout(() => {
                        form.classList.remove("shake")
                    }, 500)
                }
            }
        } catch (error) {
            console.error("Login failed: ", error)
        }
        setPassword("")
    }

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <form id="messageFormBis" onSubmit={handleSubmit}>
                    <input
                        id="messageInput"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                    <button className="unlock-button" type="submit">
                        <img src="unlock-light.png" alt="Unlock" />
                    </button>
                </form>
                <button id="fade" className="home-button" onClick={() => navigate("/")}>
                    <img src="arrow_left.png" alt="Home" height="20" />
                </button>
            </div>
        </div>
    )
}

export default Login
