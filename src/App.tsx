import { TopPage } from "./components"
import { Navbar, Sidebar } from "./containers"
import { Calendar, Customers, Dashboard, Emails, Messages, Nestable, Notes, Orders, Products, TimeLine, ToDo } from "./pages"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { allSidebarOptions } from "./data"
import { ElementType, useContext, useEffect, useState } from "react"
import { SidebarContext } from "./context/sidebarContext"
import { ToDoProvide } from "./context/toDoContext"

type PageType = {
    Icon: ElementType
    title: string
    text: string
    link: string
}

const App = () => {
    const { isSidebarOpen, isScreenSmall } = useContext(SidebarContext)
    const { pathname } = useLocation()
    const [currentPage, setCurrentPage] = useState<PageType>()
    useEffect(() => {
        const page = allSidebarOptions.find((option) => option.link === pathname.substring(1))
        setCurrentPage(page)
    }, [pathname])

    return (
        <div className="h-screen flex flex-col bg-zinc-50">
            <Navbar />
            <div className={`grid ${!isSidebarOpen || isScreenSmall ? "grid-cols-1" : "grid-cols-[auto,1fr]"} overflow-auto`}>
                <Sidebar />
                <div className="overflow-auto">
                    {currentPage && <TopPage title={currentPage.title} text={currentPage.text} Icon={currentPage.Icon} />}
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="emails" element={<Emails />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="products" element={<Products />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="messages" element={<Messages />} />
                        <Route
                            path="toDo"
                            element={
                                <ToDoProvide>
                                    <ToDo />
                                </ToDoProvide>
                            }
                        />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="nestable" element={<Nestable />} />
                        <Route path="timeLine" element={<TimeLine />} />
                        <Route path="notes" element={<Notes />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
