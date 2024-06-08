import { useContext } from "react"
import { TaskProps, ToDoContext } from "../context/toDoContext"
import { currentDay, tomorrowDay } from "../utils"
import CustomCheckbutton from "./CustomCheckbutton"
import { GoSun } from "react-icons/go"
import { TiTick } from "react-icons/ti"
import { FaRegCalendarAlt } from "react-icons/fa"
import CustomStar from "./CustomStar"

type TaskComponentProps = {
    task: TaskProps
    dragable?: boolean
    setActiveTaskItem?: (value: string | null) => void
}
const Task = ({ task, setActiveTaskItem, dragable = false }: TaskComponentProps) => {
    const { text, isCompleted, taskId, steps, taskListId, dueDate, isToday } = task
    const {
        toggleTaskStatus,
        openTaskDetailsSidebar,
        viewTaskDetails,
        isDayList,
        isImportantList,
        isPlannedList,
        lists,
        currentListId,
        isSearching,
    } = useContext(ToDoContext)

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

    return (
        <div
            className={`flex items-center justify-between gap-3 text-neutral-700 bg-zinc-200 px-3.5 ${
                steps.length > 0 || dueDate || taskListId !== currentListId || isToday || isSearching ? "py-1" : "py-2.5"
            } rounded-md hover:bg-zinc-300 cursor-default active:opacity-60 active:border active:border-neutral-400`}
            onClick={() => {
                viewTaskDetails(taskId)
                openTaskDetailsSidebar()
            }}
            draggable={dragable}
            onDragStart={() => setActiveTaskItem!(taskId)}
            onDragEnd={() => setActiveTaskItem!(null)}
        >
            <div className="flex items-center gap-3 z-10">
                <CustomCheckbutton checked={isCompleted} toggleTaskChecked={toggleTaskStatus} listId={taskListId} taskId={taskId} size={20} />
                <div className="flex flex-col text-base">
                    <div className={`${isCompleted && "line-through text-gray-500"}`}>{text}</div>
                    <div className="flex items-center gap-3 text-xs text-neutral-600 font-medium">
                        {isToday && (!isDayList || isSearching) && (
                            <div className="flex items-center gap-1">
                                <GoSun />
                                <p>My Day</p>
                            </div>
                        )}
                        {(isDayList || isImportantList || isPlannedList || isSearching) && <p> {listName} </p>}
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
            <CustomStar task={task} />
        </div>
    )
}

export default Task
