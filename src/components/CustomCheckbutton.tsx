import { useContext } from "react"
import { ToDoContext } from "../context/toDoContext"

type CustomCheckbuttonProps = {
    checked: boolean
    toggleTaskChecked?: (listId: string, taskId: string) => void
    toggleStepChecked?: (stepId: string) => void
    listId?: string
    taskId?: string
    stepId?: string
    size: number
}

const CustomCheckbutton = ({ checked, toggleTaskChecked, toggleStepChecked, listId, taskId, stepId, size }: CustomCheckbuttonProps) => {
    const {
        currentList: { color },
    } = useContext(ToDoContext)
    return (
        <div
            className={`border-[3px] rounded-full relative group shrink-0`}
            style={{
                height: `${size}px`,
                width: `${size}px`,
                backgroundColor: checked ? (color ? color : "#EA580C") : "transparent",
                borderColor: checked ? (color ? color : "#EA580C") : "#525252",
            }}
            onClick={(e) => {
                e.stopPropagation()
                stepId ? toggleStepChecked!(stepId) : toggleTaskChecked!(listId!, taskId!)
            }}
        >
            <div
                className={`absolute h-1.5 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[42deg] ${
                    checked
                        ? "opacity-100 border-white border-l-2 border-b-2 top-[40%]"
                        : "group-hover:opacity-100 opacity-0 border-neutral-600 border-l-[3px] border-b-[3px] top-[45%]"
                }`}
                style={{ width: `${size / 2 - 0.015 * size}px`, height: `${0.3 * size}px` }}
            />
        </div>
    )
}

export default CustomCheckbutton
