import { MdExpandMore, MdExpandLess } from "react-icons/md"
import { HiMenuAlt2 } from "react-icons/hi"
import { Children, ElementType, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarContext } from "../context/sidebarContext"
import { dashboardGeneralOptions, dashboardListsOptions, dashboardMainOptions } from "../data"
import { FaChartBar } from "react-icons/fa"

const Sidebar = () => {
    const { isScreenSmall, isSidebarOpen, toggle, activePage, close } = useContext(SidebarContext)
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!sidebarRef.current?.contains(e.target as Node) && isScreenSmall) {
                close()
            }
        }
        document.addEventListener("mousedown", handleClick)

        return () => document.removeEventListener("mousedown", handleClick)
    }, [close, isScreenSmall])

    return (
        <>
            {isScreenSmall && isSidebarOpen && (
                <div onClick={() => close()} className="lg:hidden fixed inset-0 z-[99999] bg-neutral-800 opacity-50" />
            )}
            <aside
                className={`lg:sticky absolute top-0 overflow-y-auto px-6 bg-zinc-100 scrollbar-hidden flex flex-col border-r transition-all duration-300 w-60 ${
                    isSidebarOpen ? "left-0" : "-left-full"
                } ${isScreenSmall ? "z-[99999] h-screen" : "z-[99] h-full"} ${!isScreenSmall && !isSidebarOpen && "hidden"}`}
                ref={sidebarRef}
            >
                {isScreenSmall && (
                    <div className="flex items-center gap-4 sticky top-0 bg-zinc-100 py-5 z-[999]">
                        <button onClick={() => toggle()}>
                            <HiMenuAlt2 className="size-6" />
                        </button>
                        <div className="flex items-center gap-1.5">
                            <FaChartBar className="size-6 text-orange-600" />
                            <h3 className="text-xl font-bold">
                                Data
                                <span className="text-orange-600">Hub</span>
                            </h3>
                        </div>
                    </div>
                )}
                <div className={`${!isScreenSmall && "pt-5"}`}>
                    <LargeSidebarSection title="Main">
                        {dashboardMainOptions.map((option, idx) => {
                            const { Icon, title, link } = option
                            return <LargeSidebarItem key={idx} Icon={Icon} title={title} link={link} isActive={activePage === title} />
                        })}
                    </LargeSidebarSection>
                    <LargeSidebarSection title="Lists" visibleItemsCount={3}>
                        {dashboardListsOptions.map((option, idx) => {
                            const { Icon, title, link } = option
                            return <LargeSidebarItem key={idx} Icon={Icon} title={title} link={link} isActive={activePage === title} />
                        })}
                    </LargeSidebarSection>
                    <LargeSidebarSection title="Generals" visibleItemsCount={3}>
                        {dashboardGeneralOptions.map((option, idx) => {
                            const { Icon, title, link } = option
                            return <LargeSidebarItem key={idx} Icon={Icon} title={title} link={link} isActive={activePage === title} />
                        })}
                    </LargeSidebarSection>
                </div>
            </aside>
        </>
    )
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemsCount?: number
}
const LargeSidebarSection = ({ children, title, visibleItemsCount = Number.POSITIVE_INFINITY }: LargeSidebarSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandButton = childrenArray.length > visibleItemsCount
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemsCount)
    const ButtonIcon = isExpanded ? MdExpandLess : MdExpandMore
    return (
        <div className="border-b mb-3 pb-1">
            <h3 className="text-[17px] font-medium px-2 mb-1">{title}</h3>
            <div className="flex flex-col">{visibleChildren}</div>
            {showExpandButton && (
                <button
                    className="flex items-center px-4 py-3.5 gap-2 text-neutral-600 hover:text-orange-600 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <ButtonIcon className="size-5" />
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    )
}

type LargeSidebarItemProps = {
    Icon: ElementType
    title: string
    link: string
    isActive: boolean
}
const LargeSidebarItem = ({ Icon, title, link, isActive }: LargeSidebarItemProps) => {
    const navigate = useNavigate()
    const { isScreenSmall, close } = useContext(SidebarContext)
    return (
        <div
            className={`py-3.5 px-4 lg:px-8 rounded-sm cursor-pointer transition-colors duration-300 ${
                isActive ? "bg-gray-200 text-indigo-400 border-l-8 border-indigo-400" : "group text-neutral-600"
            }`}
            onClick={() => {
                navigate(link)
                if (isScreenSmall) {
                    close()
                }
            }}
        >
            <div className="flex items-center gap-2 group-hover:translate-x-5 transition-transform">
                <Icon className="size-[22px]" />
                <p className="text-[15px] capitalize">{title}</p>
            </div>
        </div>
    )
}

export default Sidebar
