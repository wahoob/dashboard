import { useContext, useEffect, useRef, useState } from "react"
import { ToDoContext } from "../context/toDoContext"
import { RxCross1 } from "react-icons/rx"
import { CustomCheckbutton, CustomStar, DatePicker } from "../components"
import { FaPlus, FaRegCalendarAlt, FaRegCircle, FaRegTrashAlt } from "react-icons/fa"
import { FiPlus } from "react-icons/fi"
import { LuSun } from "react-icons/lu"
import { MdCalendarMonth } from "react-icons/md"
import { IoCheckmarkCircleOutline, IoEllipsisVertical } from "react-icons/io5"
import { TbEdit } from "react-icons/tb"
import { dueDateData } from "../data"
import { currentDay, tomorrowDay } from "../utils"

const TaskDetails = () => {
    const {
        currentTask,
        toggleTaskStatus,
        addStep,
        currentList: { color: currentListColor },
        isDayList,
        isImportantList,
        isPlannedList,
        isTasksList,
        editNote,
        noteInputValue,
        currentTaskId,
        deleteTask,
        addTask,
        closeTaskDetailsSidebar,
        isTaskDetailsSidebarOpen,
        handleEditClick,
        toggleMainTask,
        deleteDueDate,
        editDueDate,
    } = useContext(ToDoContext)
    const { isCompleted, taskId, text, steps, taskListId, isToday, dueDate } = currentTask
    const [inputValue, setInputValue] = useState("")
    const [noteInput, setNoteInput] = useState("")
    const [placeholder, setPlaceholder] = useState("Next step")
    const [isFocused, setIsFocused] = useState(false)
    const [isDueDateOpen, setIsDueDateOpen] = useState(false)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const taskDetailsRef = useRef<HTMLDivElement>(null)
    const dueDatesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const isScreenSmall = window.innerWidth < 1024
            if (!taskDetailsRef.current?.contains(e.target as Node) && isScreenSmall) {
                closeTaskDetailsSidebar()
            }
            if (!dueDatesRef.current?.contains(e.target as Node)) {
                setIsDueDateOpen(false)
                setIsDatePickerOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)

        return () => document.removeEventListener("mousedown", handleClick)
    }, [closeTaskDetailsSidebar])

    const dueDateText = () => {
        if (dueDate === currentDay) {
            return "Today"
        } else if (dueDate === tomorrowDay) {
            return "Tomorrow"
        } else if (!(dueDate === currentDay || dueDate === tomorrowDay)) {
            return `${dueDate?.format("ddd")}, ${dueDate?.format("MMM")}, ${dueDate?.format("M")}${
                !dueDate?.isSame(currentDay, "year") ? `, ${dueDate?.format("YYYY")}` : ""
            }`
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputValue !== "") {
            addStep(inputValue)
            setInputValue("")
        }
    }
    const saveNote = () => {
        editNote(noteInput)
    }
    useEffect(() => {
        setNoteInput(noteInputValue)
    }, [noteInputValue, currentTaskId])
    return (
        <>
            <div
                onClick={() => closeTaskDetailsSidebar()}
                className={`lg:hidden fixed inset-0 z-[998] bg-neutral-800 opacity-50 ${!isTaskDetailsSidebarOpen && "hidden"}`}
            />
            <div
                className={`bg-zinc-100 grow lg:sticky lg:top-4 lg:h-[calc(100vh-7.5rem)] px-3 overflow-y-auto overflow-x-hidden scrollbar-hidden flex flex-col justify-between absolute right-0 top-[4.3rem] ${
                    isTaskDetailsSidebarOpen ? "max-w-72" : "max-w-0 lg:hidden opacity-0"
                } z-[998] h-[calc(100vh-4.3rem)] text-nowrap rounded-l`}
                style={{ transition: `max-width 0.5s, ${!isTaskDetailsSidebarOpen && "opacity 0s ease 0.3s"}` }}
                ref={taskDetailsRef}
            >
                <div>
                    <div className="py-4 flex items-center justify-between sticky top-0 bg-zinc-100 z-[995]">
                        <h1 className="text-lg font-semibold">Task Details</h1>
                        <div className="hover:bg-zinc-300 p-1.5 rounded-sm shrink-0" onClick={() => closeTaskDetailsSidebar()}>
                            <RxCross1 />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {/* task name and steps */}
                        <div className="bg-zinc-200 rounded px-2 py-3 text-neutral-800">
                            {/* task name */}
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                    <CustomCheckbutton
                                        checked={isCompleted}
                                        listId={taskListId}
                                        taskId={taskId}
                                        toggleTaskChecked={toggleTaskStatus}
                                        size={20}
                                    />
                                    <div className="flex items-center gap-1">
                                        <h1 className="text-lg font-medium text-wrap break-all line-clamp-1">{text}</h1>
                                        <TbEdit className="cursor-pointer shrink-0" onClick={() => handleEditClick(text, "task")} />
                                    </div>
                                </div>
                                <CustomStar task={currentTask} />
                            </div>
                            {/* task steps */}
                            <div className="mt-2">
                                <div className="flex flex-col gap-1">
                                    {steps.map((step) => {
                                        const { stepId, text, isCompleted } = step
                                        return <Step key={stepId} stepId={stepId} text={text} isCompleted={isCompleted} />
                                    })}
                                </div>
                                <form className="flex items-center gap-2.5 pl-0.5 pr-2 text-sm pt-2.5" onSubmit={handleSubmit}>
                                    {isFocused ? (
                                        <FaRegCircle className="size-5 text-orange-600 shrink-0" style={{ color: currentListColor }} />
                                    ) : (
                                        <FiPlus className="size-5 text-orange-600 shrink-0" style={{ color: currentListColor }} />
                                    )}
                                    <input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className={`flex-1 bg-transparent outline-0 ${isDayList && "placeholder:text-[#8795A0]"} ${
                                            isImportantList && "placeholder:text-[#E8ACB8]"
                                        } ${isPlannedList && "placeholder:text-[#9AD2BA]"} ${isTasksList && "placeholder:text-[#788CDE]"} ${
                                            !(isTasksList || isDayList || isImportantList || isPlannedList) && "placeholder:text-orange-600"
                                        }`}
                                        placeholder={placeholder}
                                        onFocus={() => {
                                            setPlaceholder("")
                                            setIsFocused(true)
                                        }}
                                        onBlur={() => {
                                            setPlaceholder("Next step")
                                            setIsFocused(false)
                                        }}
                                    />
                                </form>
                            </div>
                        </div>
                        {/* add task to my day */}
                        <div className="bg-zinc-200 text-sm font-medium rounded cursor-default text-neutral-700 flex items-center">
                            <div
                                className={`flex items-center gap-2 flex-1 py-3 px-2 rounded ${!isToday && "hover:bg-zinc-300"}`}
                                onClick={() => {
                                    !isToday && addTask(undefined, "my-day-list", undefined, currentTask)
                                }}
                            >
                                <LuSun className="size-5" style={{ color: currentListColor }} />
                                <p style={{ color: currentListColor }}>Add to My Day</p>
                            </div>
                            {isToday && (
                                <div
                                    className="px-4 py-3 rounded hover:bg-zinc-300"
                                    onClick={() => {
                                        toggleMainTask(taskId, taskListId, "isToday")
                                    }}
                                >
                                    <RxCross1 />
                                </div>
                            )}
                        </div>
                        {/* add due date */}
                        <div
                            className={`flex items-center bg-zinc-200 text-sm font-medium rounded cursor-default text-neutral-700 relative ${
                                !dueDate && "hover:bg-zinc-300"
                            }`}
                            ref={dueDatesRef}
                        >
                            <div
                                className="flex-1 flex items-center gap-2 py-3 px-2 hover:bg-zinc-300 rounded"
                                onClick={() => {
                                    setIsDueDateOpen(!isDueDateOpen)
                                }}
                            >
                                <MdCalendarMonth className="size-5" style={{ color: currentListColor }} />
                                <p style={{ color: currentListColor }}>{dueDate ? `Due ${dueDateText()}` : "Add due date"}</p>
                            </div>
                            {dueDate && (
                                <div
                                    className="px-4 py-3 rounded hover:bg-zinc-300"
                                    onClick={() => {
                                        toggleMainTask(taskId, taskListId, "isPlanned")
                                        deleteDueDate()
                                    }}
                                >
                                    <RxCross1 />
                                </div>
                            )}
                            {/* dates */}
                            <div
                                className={`absolute z-[998] top-full left-1/2 -translate-x-1/2 bg-neutral-800 text-white rounded text-[13px] font-normal w-56 ${
                                    !isDueDateOpen && "hidden"
                                }`}
                            >
                                {dueDateData.map((dueDate, idx) => {
                                    const { Icon, day, text } = dueDate
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between hover:bg-neutral-950 cursor-default py-2.5 px-2"
                                            onClick={() => {
                                                editDueDate(day)
                                                setIsDueDateOpen(false)
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className="size-4" />
                                                <p>{text}</p>
                                            </div>
                                            <p>{day.format("ddd")}</p>
                                        </div>
                                    )
                                })}
                                <div
                                    className="hover:bg-neutral-950 cursor-default py-2.5 px-2 border-t border-t-neutral-500"
                                    onClick={() => {
                                        setIsDueDateOpen(false)
                                        setIsDatePickerOpen(true)
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <FaRegCalendarAlt className="size-4" />
                                        <p>Pick a date</p>
                                    </div>
                                </div>
                            </div>
                            {/* date picker */}
                            <div
                                className={`absolute top-1/2 -translate-y-[10%] left-1/2 -translate-x-1/2 z-[998] bg-neutral-800 rounded p-4 text-zinc-300 text-xs cursor-default ${
                                    !isDatePickerOpen && "hidden"
                                }`}
                            >
                                <DatePicker changeDate={editDueDate} setDatePicker={setIsDatePickerOpen} />
                            </div>
                        </div>
                        {/* show note */}
                        <form
                            className="bg-zinc-200 pt-3 pb-8 px-2 text-sm rounded"
                            onSubmit={(e) => {
                                e.preventDefault()
                                saveNote()
                            }}
                        >
                            <input
                                className="w-full bg-transparent outline-0"
                                placeholder="Add Note"
                                value={noteInput}
                                onChange={(e) => setNoteInput(e.target.value)}
                                onBlur={() => saveNote()}
                            />
                        </form>
                    </div>
                </div>
                {/* task details footer */}
                <div className="flex items-center justify-between text-neutral-700 border-t border-t-neutral-300 bg-zinc-100 sticky bottom-0">
                    <p className="flex-1 text-center text-sm font-medium">Created on {currentTask.createdDay}</p>
                    <div
                        className="hover:bg-zinc-300 p-3 rounded"
                        onClick={() => {
                            deleteTask()
                        }}
                    >
                        <FaRegTrashAlt />
                    </div>
                </div>
            </div>
        </>
    )
}

type StepProps = {
    stepId: string
    isCompleted: boolean
    text: string
}
const Step = ({ isCompleted, stepId, text }: StepProps) => {
    const { toggleStepStatus, deleteStep, promoteStepToTask } = useContext(ToDoContext)
    const [isStepDropdownOpen, setIsStepDropdownOpen] = useState(false)
    return (
        <div className="flex items-center gap-2.5 pl-1.5 pr-0.5 py-0.5 rounded hover:bg-zinc-300">
            <CustomCheckbutton size={17} checked={isCompleted} stepId={stepId} toggleStepChecked={toggleStepStatus} />
            <div className="flex items-center justify-between flex-1 relative">
                <p className={`${isCompleted && "line-through text-gray-500"} text-sm text-wrap break-all line-clamp-1`}>{text}</p>
                <div
                    className="hover:bg-opacity-20 hover:bg-white p-2 rounded-md relative"
                    onClick={() => setIsStepDropdownOpen(!isStepDropdownOpen)}
                >
                    <IoEllipsisVertical />
                    <div
                        className={`absolute top-full right-2 bg-neutral-800 text-white z-[998] rounded text-[13px] w-56 ${
                            !isStepDropdownOpen && "hidden"
                        }`}
                    >
                        <div className="border-b border-b-neutral-400">
                            <div
                                className="flex items-center gap-3 py-2.5 px-2 hover:bg-neutral-950 cursor-default"
                                onClick={() => toggleStepStatus(stepId)}
                            >
                                <IoCheckmarkCircleOutline className="size-4 shrink-0" />
                                <p className="whitespace-nowrap">Mark as {isCompleted && "not"} completed</p>
                            </div>
                            {!isCompleted && (
                                <div
                                    className="flex items-center gap-3 py-2 px-2 hover:bg-neutral-950 cursor-default"
                                    onClick={() => promoteStepToTask(stepId)}
                                >
                                    <FaPlus className="size-4 shrink-0" />
                                    <p className="whitespace-nowrap">Promote to task</p>
                                </div>
                            )}
                        </div>
                        <div
                            className="flex items-center gap-3 py-2.5 px-2 text-red-500 hover:bg-neutral-950 cursor-default"
                            onClick={() => deleteStep(stepId)}
                        >
                            <FaRegTrashAlt className="size-4 shrink-0" />
                            <p className="whitespace-nowrap">Delete step</p>
                        </div>
                    </div>
                </div>
                <div className="w-[95%] h-[1px] absolute bg-neutral-300 -bottom-1 right-3" />
            </div>
        </div>
    )
}

export default TaskDetails
