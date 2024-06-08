import { useContext, useEffect, useRef, useState } from "react"
import { ToDoContext } from "../context/toDoContext"
import { LuMenu } from "react-icons/lu"
import { DropArea, FeaturedInput, ToDoSidebarItem } from "../components"
import { SlMenu } from "react-icons/sl"
import { FaPlus } from "react-icons/fa"

type ToDoSidebarProps = {
    isToDoSidebarOpen: boolean
    setIsToDoSidebarOpen: (value: boolean) => void
}

const ToDoSidebar = ({ isToDoSidebarOpen, setIsToDoSidebarOpen }: ToDoSidebarProps) => {
    const { lists, createList, updateListRanking } = useContext(ToDoContext)
    const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)

    const onDrop = (position: number) => {
        if (activeSidebarItem) {
            updateListRanking(activeSidebarItem, position)
        }
    }

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!sidebarRef.current?.contains(e.target as Node)) {
                setIsToDoSidebarOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)

        return () => document.removeEventListener("mousedown", handleClick)
    }, [setIsToDoSidebarOpen])

    return (
        <>
            <div
                onClick={() => setIsToDoSidebarOpen(false)}
                className={`md:hidden fixed inset-0 z-[998] bg-neutral-800 opacity-50 ${!isToDoSidebarOpen && "hidden"}`}
            />
            <div
                className={`shrink-0 flex flex-col justify-between grow-1 max-w-60 bg-zinc-100 pt-4 rounded-r-lg shadow md:h-fit md:sticky absolute top-[4.3rem] h-[calc(100vh-4.3rem)] z-[998] md:top-4 mb-8 transition-all duration-300 ${
                    isToDoSidebarOpen ? "left-0" : "-left-72"
                }`}
                ref={sidebarRef}
            >
                <div>
                    {/* sidebar header */}
                    <div className="flex flex-col gap-2">
                        <div className="mx-4 p-1 rounded hover:bg-zinc-200 w-fit md:hidden" onClick={() => setIsToDoSidebarOpen(false)}>
                            <LuMenu className="size-5" />
                        </div>
                        <FeaturedInput />
                    </div>
                    {/* sidebar body */}
                    <div className="flex flex-col gap-1 md:h-[calc(100vh-13.5rem)] max-md:max-h-[calc(100vh-10.5rem)] overflow-y-auto py-1 scrollbar-hidden">
                        {/* cant edit this section */}
                        <div className="flex flex-col gap-1 border-b border-b-neutral-300 pb-1">
                            {lists.slice(0, 4).map((list) => {
                                const { count, id, name, Icon, color } = list
                                return <ToDoSidebarItem key={id} Icon={Icon!} text={name} color={color} count={count} id={id} />
                            })}
                        </div>
                        {/* can edit this section */}
                        <div className="flex flex-col">
                            <DropArea index={4} onDrop={onDrop} size={2} />
                            {lists.slice(4).map((list, index) => {
                                const { count, id, name } = list
                                return (
                                    <div key={id}>
                                        <ToDoSidebarItem
                                            Icon={SlMenu}
                                            text={name}
                                            count={count}
                                            editable
                                            id={id}
                                            setActiveSidebarItem={setActiveSidebarItem}
                                        />
                                        <DropArea index={index + 4} onDrop={onDrop} size={2} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/* sidebar footer */}
                <div className="flex items-center justify-between text-neutral-600 border-t border-t-neutral-300 py-0.5">
                    <div
                        className="flex items-center gap-4 hover:bg-stone-200 transition-colors px-4 py-2 flex-1 rounded"
                        onClick={() => createList()}
                    >
                        <FaPlus />
                        <p className="font-medium cursor-default text-[15px]">New list</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDoSidebar
