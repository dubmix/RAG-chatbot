import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./styles/global.css"
import { SiteContextProvider } from "./contexts/siteContext.tsx"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(<SiteContextProvider><App /></SiteContextProvider>)
