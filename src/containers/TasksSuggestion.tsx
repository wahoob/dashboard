import { useContext, useEffect, useRef } from "react"
import { ToDoContext } from "../context/toDoContext"
import { RxCross1 } from "react-icons/rx"
import { CustomCheckbutton } from "../components"
import { FaPlus, FaRegCalendarAlt, FaStar } from "react-icons/fa"
import { TiTick } from "react-icons/ti"
import { currentDay, tomorrowDay } from "../utils"

const TasksSuggestion = () => {
    const { lists, toggleTaskStatus, addTask, isDayList, isPlannedList, isImportantList, isSuggestionbarOpen, closeSuggestionbar } =
        useContext(ToDoContext)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const isScreenSmall = window.innerWidth < 1024
            if (!suggestionsRef.current?.contains(e.target as Node) && isScreenSmall) {
                closeSuggestionbar()
            }
        }
        document.addEventListener("mousedown", handleClick)

        return () => document.removeEventListener("mousedown", handleClick)
    }, [closeSuggestionbar])

    return (
        <>
            <div
                onClick={() => closeSuggestionbar()}
                className={`lg:hidden fixed inset-0 z-[998] bg-neutral-800 opacity-50 ${!isSuggestionbarOpen && "hidden"}`}
            />
            <div
                className={`w-72 bg-zinc-100 grow lg:sticky lg:top-4 lg:h-[calc(100vh-7.5rem)] px-3 overflow-y-auto overflow-x-hidden scrollbar-hidden absolute right-0 top-[4.2rem] ${
                    isSuggestionbarOpen ? "max-w-72" : "max-w-0 lg:hidden opacity-0"
                } z-[999] h-[calc(100vh-4.2rem)] text-nowrap rounded-l`}
                style={{ transition: `max-width 0.5s, ${!isSuggestionbarOpen && "opacity 0s ease 0.3s"}` }}
                ref={suggestionsRef}
            >
                <div className="py-4 flex items-center justify-between sticky top-0 bg-zinc-100 z-[995]">
                    <h1 className="text-lg font-semibold">Suggestions</h1>
                    <div className="hover:bg-zinc-300 p-1.5 rounded-sm shrink-0" onClick={() => closeSuggestionbar()}>
                        <RxCross1 />
                    </div>
                </div>
                <div>
                    {lists.slice(3).map((list) =>
                        list.tasks.map((task) => {
                            const { text, taskListId, isToday, isCompleted, taskId, steps, dueDate, isImportant } = task
                            const completedSteps = steps.filter((step) => step.isCompleted).length
                            const listName = lists.find((l) => l.id === taskListId)?.name
                            const dueDateText = () => {
                                if (dueDate === currentDay) {
                                    return "Today"
                                }
                                if (dueDate === tomorrowDay) {
                                    return "Tomorrow"
                                }
                                return `${dueDate?.format("ddd")}, ${dueDate?.format("MMM")}, ${dueDate?.format("M")}${
                                    !dueDate?.isSame(currentDay, "year") ? `, ${dueDate?.format("YYYY")}` : ""
                                }`
                            }
                            if (!(isCompleted || isToday)) {
                                return (
                                    <div key={taskId} className="flex items-center justify-between border-b py-1">
                                        <div className="flex items-center gap-4">
                                            <CustomCheckbutton
                                                checked={isCompleted}
                                                toggleTaskChecked={toggleTaskStatus}
                                                listId={taskListId}
                                                taskId={taskId}
                                                size={20}
                                            />
                                            <div>
                                                <h3>{text}</h3>
                                                <div className="flex items-center gap-2 text-[10px] text-neutral-600 font-medium">
                                                    {(isDayList || isImportantList || isPlannedList) && <p> {listName} </p>}
                                                    {isImportant && <FaStar />}
                                                    {steps.length > 0 && (
                                                        <div className="flex items-center gap-0.5">
                                                            {completedSteps === steps.length && <TiTick />}
                                                            <p>
                                                                {completedSteps} of {steps.length}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {dueDate && (
                                                        <div className={`flex items-center gap-1 ${dueDate.isBefore(currentDay) && "text-red-600"}`}>
                                                            <FaRegCalendarAlt />
                                                            <p>{dueDateText()}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="hover:bg-zinc-300 p-1 rounded"
                                            onClick={() => addTask(undefined, "my-day-list", undefined, task)}
                                        >
                                            <FaPlus />
                                        </div>
                                    </div>
                                )
                            }
                        })
                    )}
                </div>
            </div>
        </>
    )
}

export default TasksSuggestion
