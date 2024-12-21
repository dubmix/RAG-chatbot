import React, { createContext, useContext, useState } from "react"

interface SiteContextProps {
    isAuthenticated: boolean
    accessToken: string | null
    updateAccessToken: (token: string) => void
    updateIsAuthenticated: (auth: boolean) => void
}

const SiteContext = createContext<SiteContextProps>({
    isAuthenticated: false,
    accessToken: null,
    updateAccessToken: () => {},
    updateIsAuthenticated: () => {},
})

export const SiteContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [accessToken, setAccessToken] = useState<string | null>(null)

    const updateAccessToken = (token: string) => {
        setAccessToken(token)
    }

    const updateIsAuthenticated = (auth: boolean) => {
        setIsAuthenticated(auth)
    }

    return (
        <SiteContext.Provider value={{ isAuthenticated, accessToken, updateAccessToken, updateIsAuthenticated }}>
            {children}
        </SiteContext.Provider>
    )
}

export const useSiteContext = () => useContext(SiteContext)
