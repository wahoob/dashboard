import { FaChevronRight } from "react-icons/fa"
import { currentDay } from "../utils"
import { FcIdea } from "react-icons/fc"
import { GiNotebook } from "react-icons/gi"
import { Task, ToDoInput } from "../components"
import { SlMenu } from "react-icons/sl"
import { ElementType, useContext, useLayoutEffect, useRef, useState } from "react"
import { ToDoContext } from "../context/toDoContext"
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"

type ToDoTasksProps = {
    setIsToDoSidebarOpen: (value: boolean) => void
}
const ToDoTasks = ({ setIsToDoSidebarOpen }: ToDoTasksProps) => {
    const { currentList, isDayList, isImportantList, isPlannedList, openSuggestionbar, isSearching, searchTasks, currentListId, updatedTaskRanking } =
        useContext(ToDoContext)
    const { Icon: CurrentListIcon, color: currentListColor, count } = currentList
    const [isCompletedOpen, setIsCompletedOpen] = useState(true)
    const [containerBottom, setContainerBottom] = useState<number>(0)
    const [isDragging, setIsDragging] = useState(false)
    const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const completedTasks = currentList.tasks.filter((task) => task.isCompleted).length

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 20,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 20,
            },
        })
    )
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setIsDragging(false)

        if (active.id === over!.id) return

        const originalPos = currentList.tasks.findIndex((task) => task.id === active.id)
        const newPos = currentList.tasks.findIndex((task) => task.id === over!.id)
        const newTasks = arrayMove(currentList.tasks, originalPos, newPos)

        updatedTaskRanking(newTasks)
    }
    const handleDragStart = (event: DragStartEvent) => {
        setIsDragging(true)
        setDraggingTaskId(event.active.id.toString())
    }

    // change the position of lined background
    useLayoutEffect(() => {
        if (containerRef.current) {
            const isScreenSmall = window.innerWidth < 640
            if (isScreenSmall) {
                setContainerBottom(containerRef.current?.getBoundingClientRect().bottom - 150)
            } else {
                setContainerBottom(containerRef.current?.getBoundingClientRect().bottom - 105)
            }
        }
    }, [count, isCompletedOpen, currentListId, completedTasks])

    return (
        <div className={`flex-1 flex flex-col relative px-4 lg:px-12 w-full ${isSearching && "justify-between"}`}>
            {/* list description */}
            {currentList.tasks.length === 0 && isDayList && !isSearching && (
                <ListDescription
                    Icon={GiNotebook}
                    header="Focus on your day"
                    bodyText="Get thing done with My Day, a list that refreshes evreyday."
                    color={"#fff"}
                    iconColor={currentListColor}
                />
            )}
            {currentList.tasks.length === 0 && isImportantList && !isSearching && (
                <ListDescription Icon={GiNotebook} bodyText="Try starring some tasks to see them here." color={currentListColor} />
            )}
            {currentList.tasks.length === 0 && isPlannedList && !isSearching && (
                <ListDescription Icon={GiNotebook} bodyText="Tasks with due dates or reminders show up here." color={currentListColor} />
            )}
            {/* header */}
            <div className={`flex items-center justify-between bg-zinc-50 z-[997] sticky -top-0 py-4 bg-opacity-95 ${isSearching && "hidden"}`}>
                <div className="flex flex-col gap-2">
                    <div className="hover:bg-zinc-200 w-fit p-2 rounded md:hidden" onClick={() => setIsToDoSidebarOpen(true)}>
                        <SlMenu className="text-orange-600" />
                    </div>
                    <div className="flex items-center gap-3">
                        {CurrentListIcon && !isDayList && <CurrentListIcon className="size-6" style={{ color: currentListColor }} />}
                        <div>
                            <h1
                                className="text-3xl font-semibold text-orange-600 break-all break-words line-clamp-1"
                                style={{ color: currentListColor }}
                            >
                                {currentList.name}
                            </h1>
                            {isDayList && (
                                <p className="text-sm" style={{ color: currentListColor }}>
                                    {currentDay.format("dddd")}, {currentDay.format("MMMM")} {currentDay.format("D")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                {isDayList && (
                    <div className="transition-colors duration-75 hover:bg-zinc-200 p-0.5 rounded-md" onClick={() => openSuggestionbar()}>
                        <FcIdea className="size-6" />
                    </div>
                )}
            </div>
            {/* body */}
            <div
                className={`h-full relative overflow-hidden md:min-h-[calc(100vh-15.5rem)] min-h-[calc(100vh-17.5rem)] break-all ${
                    isSearching && "hidden"
                }`}
            >
                <div ref={containerRef}>
                    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCorners}>
                        {/* uncompleted tasks */}
                        <div className="flex flex-col gap-0.5 transition-all duration-300">
                            <SortableContext items={currentList.tasks} strategy={verticalListSortingStrategy}>
                                {currentList.tasks.map((task) => {
                                    const { id, isCompleted } = task
                                    if (!isCompleted) {
                                        return (
                                            <div
                                                key={id}
                                                className={`transition-all ${isDragging && draggingTaskId !== id && "scale-95 opacity-50"}`}
                                            >
                                                <Task task={task} />
                                            </div>
                                        )
                                    }
                                })}
                            </SortableContext>
                        </div>
                    </DndContext>
                    {/* completed tasks */}
                    <div className={`mt-1 flex flex-col gap-0.5 transition-all ${isDragging && "scale-95 opacity-50"}`}>
                        {currentList.tasks.some((task) => task.isCompleted === true) && (
                            <div
                                className={`flex items-center gap-2 px-2 py-1 bg-[#eeeeef] hover:bg-[#e2e2e3] w-fit rounded mb-1 cursor-default text-neutral-600`}
                                onClick={() => setIsCompletedOpen(!isCompletedOpen)}
                            >
                                <FaChevronRight className={`size-3 transition-transform ${isCompletedOpen && "rotate-90"}`} />
                                <div className="flex gap-2 items-center font-medium">
                                    <p>Completed</p>
                                    <p className="text-sm">{completedTasks}</p>
                                </div>
                            </div>
                        )}
                        {isCompletedOpen &&
                            currentList.tasks.map((task) => {
                                const { id, isCompleted } = task
                                if (isCompleted) {
                                    return <Task key={id} task={task} />
                                }
                            })}
                    </div>
                </div>
                {/* show the lined background */}
                {!((isDayList || isImportantList || isPlannedList) && currentList.tasks.length === 0) && (
                    <div
                        className={`max-h-full h-full absolute w-full -z-0 lined-bg ${containerBottom + 250 >= window.innerHeight && "hidden"}`}
                        style={{
                            top: `${isCompletedOpen ? containerBottom : containerBottom - 30}px`,
                        }}
                    />
                )}
            </div>
            {isSearching && (
                <div className="flex flex-col gap-0.5">
                    {searchTasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </div>
            )}
            {/* footer */}
            {!isSearching && <ToDoInput />}
        </div>
    )
}

type ListDescriptionProps = {
    header?: string
    bodyText: string
    Icon: ElementType
    color?: string
    iconColor?: string
}
const ListDescription = ({ header, bodyText, Icon, color = "#FB923C", iconColor }: ListDescriptionProps) => {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center justify-between h-48 w-60 bg-black bg-opacity-60 px-3 py-6 rounded-md text-white">
                <Icon className="size-full mb-3 flex-1" style={{ color: iconColor || color }} />
                <h3 className="font-medium" style={{ color: color }}>
                    {header}
                </h3>
                <p className="text-xs text-center" style={{ color: color }}>
                    {bodyText}
                </p>
            </div>
        </div>
    )
}

export default ToDoTasks
