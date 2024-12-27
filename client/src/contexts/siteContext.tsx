import React, { createContext, useContext, useState } from "react"

interface SiteContextProps {
    fetchLocalStorage: boolean
    triggerFetchLocalStorage: () => void
}

const SiteContext = createContext<SiteContextProps>({
    fetchLocalStorage: false,
    triggerFetchLocalStorage: () => {},
})

export const SiteContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fetchLocalStorage, setFetchLocalStorage] = useState<boolean>(false)

    const triggerFetchLocalStorage = () => {
        setFetchLocalStorage(!fetchLocalStorage)
    }

    return (
        <SiteContext.Provider value={{ fetchLocalStorage, triggerFetchLocalStorage }}>
            {children}
        </SiteContext.Provider>
    )
}

export const useSiteContext = () => useContext(SiteContext)
