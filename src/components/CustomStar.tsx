import { useContext } from "react"
import { TaskProps, ToDoContext } from "../context/toDoContext"
import { FaRegStar, FaStar } from "react-icons/fa"

type CustomStarProps = {
    task: TaskProps
}
const CustomStar = ({ task }: CustomStarProps) => {
    const { taskId, isImportant, taskListId } = task
    const {
        isDayList,
        isPlannedList,
        isImportantList,
        isTasksList,
        addTask,
        toggleMainTask,
        currentList: { color },
    } = useContext(ToDoContext)
    const StarIcon = isImportant ? FaStar : FaRegStar
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        if (isImportant) {
            toggleMainTask(taskId, taskListId, "isImportant")
        } else {
            addTask(undefined, "important-list", undefined, task)
        }
    }
    return (
        <div
            className={`transition-colors h-7 flex items-center justify-center hover:opacity-70 z-10 ${isDayList && "hover:text-[#8795A0]"} ${
                isImportantList && "hover:text-[#E8ACB8]"
            } ${isPlannedList && "hover:text-[#9AD2BA]"} ${isTasksList && "hover:text-[#788CDE]"} ${
                !(isTasksList || isDayList || isImportantList || isPlannedList) && "hover:text-orange-600 text-orange-600"
            }`}
            style={{ color: color }}
            onClick={(event) => handleClick(event)}
        >
            <StarIcon className="size-5" />
        </div>
    )
}

export default CustomStar
