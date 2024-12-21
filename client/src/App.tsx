import React, { useEffect }from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route, useLocation } from "react-router-dom"
import Chat from "./Chat.tsx"
import Saved from "./Saved.tsx"
import About from "./About.tsx"
import Login from "./Login.tsx"
import Home from "./Home.tsx"
import "./styles/app.css"
import { useSiteContext } from "./contexts/siteContext.tsx"

const VALIDATION_INTERVAL = 10 * 1000
const apiBaseHost = process.env.REACT_APP_BASE_URL || "https://hilfy.co"
const apiBasePort = process.env.REACT_APP_BASE_PORT || ""
export const baseUrl = `${apiBaseHost}:${apiBasePort}`

const App: React.FC = () => {
    const { isAuthenticated, updateIsAuthenticated, accessToken, updateAccessToken } = useSiteContext()

    const handleLogout = async () => {
        const token = accessToken
        if (token) {
            updateIsAuthenticated(false)
            updateAccessToken("")
        }
    }

    const validateSession = async () => {
        const token = accessToken
        if (accessToken) {
            try {
                const response = await fetch(`${baseUrl}/api/protected?token=${token}`)
                if (!response.ok) {
                    handleLogout()
                }
            } catch {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            const intervalId = setInterval(validateSession, VALIDATION_INTERVAL)
            return () => {
                clearInterval(intervalId)
            }
        }
    }, [isAuthenticated])

    return (
        <Router>
            <AppContent />
        </Router>
    )
}

const AppContent: React.FC = () => {
    const location = useLocation()
    const isHome = location.pathname === "/"
    const { isAuthenticated } = useSiteContext()

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

export default App
