import { FaRegCalendarAlt, FaRegCircle, FaRegTrashAlt } from "react-icons/fa"
import { FiPlus } from "react-icons/fi"
import { currentDay, tomorrowDay } from "../utils"
import { dueDateData } from "../data"
import { useContext, useEffect, useRef, useState } from "react"
import { ToDoContext } from "../context/toDoContext"
import { SlMenu } from "react-icons/sl"
import DatePicker from "./DatePicker"
import { Dayjs } from "dayjs"

const ToDoInput = () => {
    const {
        lists,
        addTask,
        isDayList,
        isImportantList,
        isPlannedList,
        isTasksList,
        isEditingTask,
        currentTask: { text },
        currentListId,
        editTask,
        currentList,
    } = useContext(ToDoContext)
    const { color: currentListColor } = currentList
    const [placeholder, setPlaceholder] = useState("Add Task")
    const [isFocused, setIsFocused] = useState(false)
    const [isListsOpen, setIsListsOpen] = useState(false)
    const [isDueDateOpen, setIsDueDateOpen] = useState(false)
    const [listId, setListId] = useState(lists[3].id)
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState("")
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [dueDate, setDueDate] = useState<Dayjs | null>(null)
    const [isTyping, setIsTyping] = useState(false)
    const listsRef = useRef<HTMLDivElement>(null)
    const dueDatesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!listsRef.current?.contains(e.target as Node)) {
                setIsListsOpen(false)
            }
            if (!dueDatesRef.current?.contains(e.target as Node)) {
                setIsDueDateOpen(false)
                setIsDatePickerOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)

        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        editOrAddTask()
    }
    const editOrAddTask = () => {
        const trimmedInputValue = inputValue.replace(/^\s+/, "")
        if (trimmedInputValue !== "") {
            isEditingTask ? editTask(trimmedInputValue) : dueDate ? addTask(trimmedInputValue, listId, dueDate) : addTask(trimmedInputValue, listId)
            setInputValue("")
        }
    }

    useEffect(() => {
        if (isEditingTask) {
            inputRef.current?.focus()
            setPlaceholder("Edit Task")
            setInputValue(text)
        }
    }, [isEditingTask, text])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 255) setInputValue(e.target.value)
        if (e.target.value.length > 0) {
            setIsTyping(true)
        } else {
            setIsTyping(false)
        }
    }

    useEffect(() => {
        setInputValue("")
        setIsTyping(false)
        isDayList || isImportantList || isPlannedList ? setListId(lists[3].id) : setListId(currentListId)
        isPlannedList ? setDueDate(currentDay) : setDueDate(null)
    }, [currentListId, isPlannedList, isDayList, isImportantList, lists])

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

    return (
        <div className="pt-2 pb-7 bg-zinc-50 sticky -bottom-0 z-10 bg-opacity-95 flex-1">
            <div
                className="flex items-center justify-between bg-[#4A4A4A] rounded-md group hover:bg-[#3E3E3E] focus-within:bg-[#3E3E3E] cursor-text gap-1"
                onClick={() => inputRef.current?.focus()}
            >
                <form className="flex items-center gap-2.5 py-3.5 pl-3.5 flex-1" onSubmit={handleSubmit}>
                    {isFocused ? (
                        <FaRegCircle className="text-orange-600 size-6 text-opacity-70 cursor-default" style={{ color: currentListColor }} />
                    ) : (
                        <FiPlus className="text-orange-600 size-6 text-opacity-70 cursor-default" style={{ color: currentListColor }} />
                    )}
                    <input
                        className={`bg-[#4A4A4A] outline-0 placeholder:text-[15px] placeholder:text-opacity-70 w-full text-sm group-hover:bg-[#3E3E3E] focus:bg-[#3E3E3E] text-white ${
                            isDayList && "placeholder:text-[#8795A0]"
                        } ${isImportantList && "placeholder:text-[#E8ACB8]"} ${isPlannedList && "placeholder:text-[#9AD2BA]"} ${
                            isTasksList && "placeholder:text-[#788CDE]"
                        } ${!(isTasksList || isDayList || isImportantList || isPlannedList) && "placeholder:text-orange-600"}`}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={handleChange}
                        ref={inputRef}
                        onFocus={() => {
                            setIsFocused(true)
                        }}
                        onBlur={() => {
                            setPlaceholder("Add Task")
                            setIsFocused(false)
                            isEditingTask && editOrAddTask()
                        }}
                    />
                </form>
                <div className={`flex items-center min-h-full text-zinc-100 text-sm ${!isTyping && "hidden"}`}>
                    {/* lists button */}
                    {(isDayList || isPlannedList || isImportantList) && (
                        <div className="relative" ref={listsRef}>
                            <button
                                className="p-3.5 rounded hover:bg-black hover:bg-opacity-25 flex items-center gap-2.5 font-thin"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsListsOpen(!isListsOpen)
                                }}
                            >
                                <FaRegCalendarAlt className="size-[17px]" />
                                {lists.find((list) => list.id === listId)?.name}
                            </button>
                            {/* lists */}
                            <div className={`absolute bottom-12 -right-9 z-[998] bg-neutral-800 w-56 rounded ${!isListsOpen && "hidden"}`}>
                                {lists.slice(3).map((list) => {
                                    const { Icon, name, id } = list
                                    return (
                                        <div
                                            key={id}
                                            className="flex items-center gap-4 hover:bg-neutral-950 cursor-default py-2.5 px-2.5"
                                            onClick={() => {
                                                setListId(id)
                                                setIsListsOpen(!isListsOpen)
                                            }}
                                        >
                                            {Icon ? <Icon /> : <SlMenu />}
                                            {name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    {/* dates button */}
                    <div className="relative" ref={dueDatesRef}>
                        <button
                            className="p-3.5 rounded hover:bg-black hover:bg-opacity-25 flex items-center gap-2.5 font-thin"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsDueDateOpen(!isDueDateOpen)
                            }}
                        >
                            <FaRegCalendarAlt className="size-[17px]" />
                            {dueDate && dueDateText()}
                        </button>
                        {/* dates */}
                        <div
                            className={`absolute bottom-12 -right-2 z-[998] bg-neutral-800 w-56 rounded cursor-default ${!isDueDateOpen && "hidden"}`}
                        >
                            {dueDateData.map((dueDate, idx) => {
                                const { Icon, day, text } = dueDate
                                return (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between hover:bg-neutral-950 py-2.5 px-2"
                                        onClick={() => {
                                            setDueDate(day)
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
                                className="hover:bg-neutral-950 py-2.5 px-2 border-t border-t-neutral-500"
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
                            {dueDate && (
                                <div
                                    className="py-2.5 px-2 border-t border-t-neutral-500 hover:bg-neutral-950 flex items-center gap-3 text-red-600"
                                    onClick={() => {
                                        setDueDate(null)
                                        setIsDueDateOpen(false)
                                    }}
                                >
                                    <FaRegTrashAlt />
                                    <p>Remove due date</p>
                                </div>
                            )}
                        </div>
                        {/* date picker */}
                        <div
                            className={`absolute bottom-12 -right-2 z-[998] bg-neutral-800 rounded p-4 text-zinc-300 text-xs cursor-default ${
                                !isDatePickerOpen && "hidden"
                            }`}
                        >
                            <DatePicker changeDate={setDueDate} setDatePicker={setIsDatePickerOpen} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoInput
