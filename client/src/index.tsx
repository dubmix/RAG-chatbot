import React from "react"
import { createRoot } from "react-dom/client"
import Site from "./site/index.tsx"
import "./global.css"
import { SiteContextProvider } from "./contexts/siteContext.tsx"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(<SiteContextProvider><Site /></SiteContextProvider>)
