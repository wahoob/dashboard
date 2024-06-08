import { createContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type SidebarContextProps = {
    isSidebarOpen: boolean
    isScreenSmall: boolean
    activePage: string
    toggle: () => void
    close: () => void
}
export const SidebarContext = createContext<SidebarContextProps>({
    isSidebarOpen: false,
    isScreenSmall: true,
    activePage: "dashboard",
    toggle: () => {},
    close: () => {},
})

type SidebarProviderProps = {
    children: React.ReactNode
}
export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [activePage, setActivePage] = useState("dashboard")
    const { pathname } = useLocation()
    // change the active page
    useEffect(() => {
        setActivePage(pathname.substring(1))
    }, [pathname])

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1024)
    // toggle and close the sidebar
    function toggle() {
        setIsSidebarOpen((s) => !s)
    }
    function close() {
        setIsSidebarOpen(false)
    }
    // check the screen width on the resize
    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.innerWidth < 1024)
        }
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])
    // close the sidebar on the small screens and open it on large screens
    useEffect(() => {
        if (isScreenSmall) {
            setIsSidebarOpen(false)
        } else {
            setIsSidebarOpen(true)
        }
    }, [isScreenSmall])
    return (
        <SidebarContext.Provider
            value={{
                isSidebarOpen,
                isScreenSmall,
                activePage,
                toggle,
                close,
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}
