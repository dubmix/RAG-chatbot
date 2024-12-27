import React, { useEffect }from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route, useLocation } from "react-router-dom"
import Chat from "./Chat/index.tsx"
import Saved from "./Saved/index.tsx"
import About from "./About/index.tsx"
import Login from "../components/Login/index.tsx"
import Home from "./Home/index.tsx"
import "./styles.css"
import { useSiteContext } from "../contexts/siteContext.tsx"

const VALIDATION_INTERVAL = 10 * 1000
const apiBaseHost = process.env.REACT_APP_BASE_URL || "https://hilfy.co"
const apiBasePort = process.env.REACT_APP_BASE_PORT || ""

export const baseUrl = `${apiBaseHost}:${apiBasePort}`

const SiteContent: React.FC = () => {
    const location = useLocation()
    const isHome = location.pathname === "/"
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

    return (
        <>
            <div className={!isAuthenticated && !isHome ? "blurred-background" : ""}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/saved' element={<Saved />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </div>
            {!isAuthenticated && !isHome && (
                <div className="login-overlay">
                    <Login />
                </div>
            )}
        </>
    )
}

const Site: React.FC = () => {
    const accessToken = localStorage.getItem("accessToken")
    const { fetchLocalStorage } = useSiteContext()

    const handleLogout = async () => {
        const token = accessToken
        if (token) {
            localStorage.setItem("isAuthenticated", "false")
            localStorage.setItem("accessToken", "")
        }
    }

    const validateSession = async () => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            try {
                const response = await fetch(`${baseUrl}/api/protected?token=${accessToken}`)
                if (!response.ok) {
                    handleLogout()
                }
            } catch {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem("isAuthenticated") === "true") {
            const intervalId = setInterval(validateSession, VALIDATION_INTERVAL)
            return () => {
                clearInterval(intervalId)
            }
        }
    }, [fetchLocalStorage])

    return (
        <Router>
            <SiteContent />
        </Router>
    )
}


export default Site
