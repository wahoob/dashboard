import { MdZoomOutMap } from "react-icons/md"
import { IoIosSearch, IoIosNotifications } from "react-icons/io"
import { IoChatbox } from "react-icons/io5"
import { HiMenuAlt2 } from "react-icons/hi"
import { useContext, useEffect, useState } from "react"
import { SidebarContext } from "../context/sidebarContext"
import { FaChartBar } from "react-icons/fa"

const Navbar = () => {
    const { toggle, isScreenSmall } = useContext(SidebarContext)
    const [isFullScreen, setIsFullScreen] = useState(false)
    useEffect(() => {
        if (isFullScreen) {
            document.documentElement.requestFullscreen()
        } else {
            if (document.fullscreenElement !== null) {
                document.exitFullscreen()
            }
        }
    }, [isFullScreen])

    return (
        <nav className="flex items-center justify-between py-5 px-6 shadow z-[999]">
            <div className="flex items-center gap-4">
                <button onClick={() => toggle()}>
                    <HiMenuAlt2 className="size-6" />
                </button>
                <div className="flex items-center gap-1.5">
                    <FaChartBar className="size-6 text-orange-600" />
                    <h3 className="text-xl font-bold">
                        Data<span className="text-orange-600">Hub</span>
                    </h3>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-6">
                    {!isScreenSmall && (
                        <MdZoomOutMap
                            className="cursor-pointer transition-transform hover:scale-125"
                            onClick={() => setIsFullScreen(!isFullScreen)}
                        />
                    )}

                    <IoIosSearch className="cursor-pointer transition-transform hover:scale-125" />
                </div>
                <div className="flex gap-8 items-center max-sm:hidden">
                    <IoIosNotifications className="size-6 cursor-pointer" />
                    <IoChatbox className="size-5 cursor-pointer" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
