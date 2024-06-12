import { useContext } from "react"
import { TaskProps, ToDoContext } from "../context/toDoContext"
import { currentDay, tomorrowDay } from "../utils"
import CustomCheckbutton from "./CustomCheckbutton"
import { GoSun } from "react-icons/go"
import { TiTick } from "react-icons/ti"
import { FaRegCalendarAlt } from "react-icons/fa"
import CustomStar from "./CustomStar"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type TaskComponentProps = {
    task: TaskProps
}
const Task = ({ task }: TaskComponentProps) => {
    const { text, isCompleted, id, steps, taskListId, dueDate, isToday } = task
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

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div
            className={`flex items-center justify-between gap-3 text-neutral-700 bg-zinc-200 px-3.5 ${
                steps.length > 0 || dueDate || taskListId !== currentListId || isToday || isSearching ? "py-1" : "py-2.5"
            } rounded-md hover:bg-zinc-300 cursor-default touch-none`}
            onClick={() => {
                viewTaskDetails(id)
                openTaskDetailsSidebar()
            }}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            <div className="flex items-center gap-3">
                <CustomCheckbutton checked={isCompleted} toggleTaskChecked={toggleTaskStatus} listId={taskListId} taskId={id} size={20} />
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
