import { ElementType, createContext, useCallback, useEffect, useLayoutEffect, useReducer, useState } from "react"
import { AiFillHome } from "react-icons/ai"
import { FaRegStar } from "react-icons/fa"
import { GoSun } from "react-icons/go"
import { MdOutlineViewWeek } from "react-icons/md"
import { v4 as uuidv4 } from "uuid"
import { fullCurrentDay } from "../utils"
import { Dayjs } from "dayjs"

type ToDoContextProps = {
    currentListId: string
    changeList: (listId: string) => void
    lists: ListProps[]
    isDayList: boolean
    isImportantList: boolean
    isPlannedList: boolean
    isTasksList: boolean
    createList: () => void
    deleteList: (listId: string) => void
    editList: (listId: string, newName: string) => void
    currentList: ListProps
    addTask: (text?: string, listId?: string, dueDate?: Dayjs, task?: TaskProps) => void
    toggleTaskStatus: (listId: string, taskId: string) => void
    isTaskDetailsSidebarOpen: boolean
    openTaskDetailsSidebar: () => void
    closeTaskDetailsSidebar: () => void
    currentTask: TaskProps
    viewTaskDetails: (taskId: string) => void
    addStep: (text: string) => void
    toggleStepStatus: (stepId: string) => void
    deleteStep: (stepId: string) => void
    promoteStepToTask: (stepId: string) => void
    editNote: (text: string) => void
    noteInputValue: string
    currentTaskId: string
    deleteTask: () => void
    toggleMainTask: (taskId: string, listId: string, toggleProperty: TogglePropertyProps) => void
    inputEditValue: string
    handleEditClick: (text: string, editType: "list" | "task") => void
    isEditingList: boolean
    isEditingTask: boolean
    editTask: (newName: string) => void
    editDueDate: (dueDate: Dayjs) => void
    deleteDueDate: () => void
    isSuggestionbarOpen: boolean
    openSuggestionbar: () => void
    closeSuggestionbar: () => void
    isSearching: boolean
    toggleSearch: (isSearching: boolean, searchValue?: string) => void
    searchTasks: TaskProps[]
    updateListRanking: (listId: string, position: number) => void
    updatedTaskRanking: (newTasks: TaskProps[]) => void
}

type TogglePropertyProps = "isImportant" | "isToday" | "isPlanned"

const iconMap: { [key: string]: ElementType } = {
    "my-day-list": GoSun,
    "important-list": FaRegStar,
    "planned-list": MdOutlineViewWeek,
    "tasks-list": AiFillHome,
}

const initialLists: ListProps[] = [
    { id: "my-day-list", name: "My Day", tasks: [], count: 0, color: "#8795A0" },
    { id: "important-list", name: "Important", tasks: [], count: 0, color: "#E8ACB8" },
    { id: "planned-list", name: "Planned", tasks: [], count: 0, color: "#9AD2BA" },
    { id: "tasks-list", name: "Tasks", tasks: [], count: 0, color: "#788CDE" },
]
const initialTask: TaskProps = {
    id: "",
    text: "",
    taskListId: "",
    steps: [],
    dueDate: null,
    isCompleted: false,
    isToday: false,
    isPlanned: false,
    isImportant: false,
    note: "",
    createdDay: "",
}
const loadListsFromLocalStorage = (): ListProps[] => {
    const listsData = localStorage.getItem("lists")
    if (!listsData) {
        return initialLists.map((list) => ({
            ...list,
            Icon: iconMap[list.id], // Assign the correct icon
        }))
    }
    const lists: ListProps[] = JSON.parse(listsData)
    return lists.map((list) => ({
        ...list,
        Icon: iconMap[list.id], // Assign the correct icon
    }))
}

export const ToDoContext = createContext<ToDoContextProps>({
    currentListId: "my-day-list",
    changeList: () => {},
    lists: initialLists,
    isDayList: true,
    isImportantList: false,
    isPlannedList: false,
    isTasksList: false,
    createList: () => {},
    deleteList: () => {},
    editList: () => {},
    currentList: initialLists[0],
    addTask: () => {},
    toggleTaskStatus: () => {},
    isTaskDetailsSidebarOpen: false,
    openTaskDetailsSidebar: () => {},
    closeTaskDetailsSidebar: () => {},
    currentTask: initialTask,
    viewTaskDetails: () => {},
    addStep: () => {},
    toggleStepStatus: () => {},
    deleteStep: () => {},
    promoteStepToTask: () => {},
    editNote: () => {},
    noteInputValue: "",
    currentTaskId: "",
    deleteTask: () => {},
    toggleMainTask: () => {},
    inputEditValue: "",
    handleEditClick: () => {},
    isEditingList: false,
    isEditingTask: false,
    editTask: () => {},
    editDueDate: () => {},
    deleteDueDate: () => {},
    isSuggestionbarOpen: false,
    openSuggestionbar: () => {},
    closeSuggestionbar: () => {},
    isSearching: false,
    toggleSearch: () => {},
    searchTasks: [],
    updateListRanking: () => {},
    updatedTaskRanking: () => {},
})

export type StepsProps = {
    stepId: string
    text: string
    isCompleted: boolean
}
export type TaskProps = {
    id: string
    text: string
    taskListId: string
    steps: StepsProps[]
    dueDate: Dayjs | null
    isCompleted: boolean
    isToday: boolean
    isImportant: boolean
    isPlanned: boolean
    note: string
    createdDay: string
}
type ListProps = {
    id: string
    name: string
    tasks: TaskProps[]
    count: number
    Icon?: ElementType
    color?: string
}

type StateProps = {
    lists: ListProps[]
    currentListId: string
    currentTaskId: string
    isEditingList: boolean
    isEditingTask: boolean
    noteInputValue: string
    editInputValue: string
    isModifying: boolean
    isDayList: boolean
    isImportantList: boolean
    isPlannedList: boolean
    isTasksList: boolean
    isSearching: boolean
    searchTasks: TaskProps[]
}
const initialState: StateProps = {
    lists: loadListsFromLocalStorage(),
    currentListId: "my-day-list",
    currentTaskId: "",
    isEditingList: false,
    isEditingTask: false,
    noteInputValue: "",
    editInputValue: "",
    isModifying: false,
    isDayList: true,
    isImportantList: false,
    isPlannedList: false,
    isTasksList: false,
    isSearching: false,
    searchTasks: [],
}

type ActionProps = {
    type:
        | "CHANGE_LIST"
        | "CREATE_LIST"
        | "DELETE_LIST"
        | "EDIT_LIST"
        | "ADD_TASK"
        | "DELETE_TASK"
        | "EDIT_TASK"
        | "EDIT_DUE_DATE"
        | "DELETE_DUE_DATE"
        | "TOGGLE_TASK_STATUS"
        | "VIEW_TASK_DETAILS"
        | "ADD_STEP"
        | "TOGGLE_STEP_STATUS"
        | "DELETE_STEP"
        | "PROMOTE_STEP_TO_TASK"
        | "EDIT_NOTE"
        | "MODIFY_MAIN_TASKS"
        | "TOGGLE_MAIN_TASK"
        | "HANDLE_EDIT_CLICK"
        | "TOGGLE_SEARCHING"
        | "UPDATE_LIST_RANKING"
        | "UPDATE_TASK_RANKING"
    payload?: {
        listId?: string
        taskId?: string
        stepId?: string
        text?: string
        dueDate?: Dayjs
        task?: TaskProps
        toggleProperty?: TogglePropertyProps
        editType?: "task" | "list"
        searchValue?: string
        isSearching?: boolean
        position?: number
        newTasks?: TaskProps[]
    }
}
function reducer(state: StateProps, { type, payload }: ActionProps) {
    switch (type) {
        case "CHANGE_LIST": {
            const { listId } = payload!
            return {
                ...state,
                currentListId: listId!,
                isEditingList: false,
                isDayList: listId === initialLists[0].id ? true : false,
                isImportantList: listId === initialLists[1].id ? true : false,
                isPlannedList: listId === initialLists[2].id ? true : false,
                isTasksList: listId === initialLists[3].id ? true : false,
                isSearching: false,
            }
        }
        case "CREATE_LIST": {
            const newListId = uuidv4()
            const tempList: ListProps = {
                name: "Untitled list",
                tasks: [],
                count: 0,
                id: newListId,
            }
            return {
                ...state,
                lists: [...state.lists, tempList],
                currentListId: newListId,
                isEditingList: true,
                editInputValue: tempList.name,
                isDayList: false,
                isImportantList: false,
                isPlannedList: false,
                isTasksList: false,
                isSearching: false,
            }
        }
        case "DELETE_LIST": {
            const { listId } = payload!
            const tempLists = state.lists.filter((list) => list.id !== listId)
            let newCurrentListId
            const deletedListIndex = state.lists.findIndex((list) => list.id === listId)
            if (listId === state.currentListId) {
                newCurrentListId = state.lists[deletedListIndex - 1].id
            } else {
                newCurrentListId = state.currentListId
            }
            return {
                ...state,
                lists: tempLists,
                currentListId: newCurrentListId,
                isModifying: true,
                isTasksList: newCurrentListId === initialLists[3].id ? true : false,
            }
        }
        case "HANDLE_EDIT_CLICK": {
            const { text, editType } = payload!
            return {
                ...state,
                editInputValue: text!,
                isEditingList: editType === "list" ? true : false,
                isEditingTask: editType === "task" ? true : false,
            }
        }
        case "EDIT_LIST": {
            const { listId, text } = payload!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === listId) {
                    return {
                        ...list,
                        name: text!,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: text === "" ? state.lists : updatedLists,
                isEditingList: false,
            }
        }
        case "ADD_TASK": {
            const newTaskId = uuidv4()
            const { listId, dueDate, text, task } = payload!
            const tempTask: TaskProps = task || {
                id: newTaskId,
                text: text!,
                taskListId: listId || state.currentListId,
                steps: [],
                dueDate: dueDate || null,
                isCompleted: false,
                isToday: false,
                isPlanned: dueDate ? true : false,
                isImportant: false,
                note: "",
                createdDay: fullCurrentDay,
            }
            if (listId === initialLists[0].id || state.isDayList) {
                tempTask.isToday = true
            } else if (listId === initialLists[1].id || state.isImportantList) {
                tempTask.isImportant = true
            } else if (listId === initialLists[2].id || state.isPlannedList) {
                tempTask.isPlanned = true
            }
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (
                    list.id === (listId || state.currentListId) ||
                    (list.id === initialLists[0].id && state.isDayList) ||
                    (list.id === initialLists[1].id && state.isImportantList) ||
                    (list.id === initialLists[2].id && (state.isPlannedList || tempTask.dueDate))
                ) {
                    const exist = list.tasks.some((task) => task.id === tempTask.id)
                    if (!exist) {
                        return {
                            ...list,
                            tasks: [...list.tasks, tempTask],
                            count: list.count + 1,
                        }
                    }
                    return list
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
            }
        }
        case "DELETE_TASK": {
            const selectedTask = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((t) => t.id === state.currentTaskId)!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    const updatedTasks = list.tasks.filter((task) => task.id !== state.currentTaskId)
                    return {
                        ...list,
                        tasks: updatedTasks,
                        count: updatedTasks.length,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: true,
            }
        }
        case "EDIT_TASK": {
            const { text } = payload!
            const selectedTask = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((t) => t.id === state.currentTaskId)!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    const updatedTasks = list.tasks.map((task) => {
                        if (task.id === state.currentTaskId) {
                            return {
                                ...task,
                                text: text!,
                            }
                        }
                        return task
                    })
                    return {
                        ...list,
                        tasks: updatedTasks,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: true,
                isEditingTask: false,
            }
        }
        case "EDIT_DUE_DATE": {
            const { dueDate } = payload!
            const selectedTask = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((task) => task.id === state.currentTaskId)!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    const updatedTasks = list.tasks.map((task) => {
                        if (task.id === state.currentTaskId) {
                            return {
                                ...task,
                                dueDate: dueDate!,
                                isPlanned: true,
                            }
                        }
                        return task
                    })
                    return {
                        ...list,
                        tasks: updatedTasks,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: true,
            }
        }
        case "DELETE_DUE_DATE": {
            const selectedTask = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((t) => t.id === state.currentTaskId)!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    const updatedTasks = list.tasks.map((task) => {
                        if (task.id === state.currentTaskId) {
                            return {
                                ...task,
                                dueDate: null,
                            }
                        }
                        return task
                    })
                    return {
                        ...list,
                        tasks: updatedTasks,
                    }
                }
                return list
            })
            return { ...state, lists: updatedLists, isModifying: true }
        }
        case "TOGGLE_TASK_STATUS": {
            const { listId, taskId } = payload!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === listId) {
                    return {
                        ...list,
                        tasks: list.tasks.map((task) => {
                            if (task.id === taskId) {
                                return {
                                    ...task,
                                    isCompleted: !task.isCompleted,
                                }
                            }
                            return task
                        }),
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: true,
            }
        }
        case "VIEW_TASK_DETAILS": {
            const { taskId } = payload!
            const tempTaskNote = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((task) => task.id === taskId)!.note
            return {
                ...state,
                currentTaskId: taskId!,
                noteInputValue: tempTaskNote,
            }
        }
        case "ADD_STEP": {
            const newStepId = uuidv4()
            const { text } = payload!
            const selectedTask = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((t) => t.id === state.currentTaskId)!
            const tempStep: StepsProps = {
                stepId: newStepId,
                text: text!,
                isCompleted: false,
            }
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    const updatedTasks = list.tasks.map((task) => {
                        if (task.id === state.currentTaskId) {
                            return {
                                ...task,
                                steps: [...task.steps, tempStep],
                            }
                        }
                        return task
                    })
                    return {
                        ...list,
                        tasks: updatedTasks,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: true,
            }
        }
        case "TOGGLE_STEP_STATUS": {
            const { stepId } = payload!
            const selectedTask = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((t) => t.id === state.currentTaskId)!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    const updatedTasks = list.tasks.map((task) => {
                        if (task.id === state.currentTaskId) {
                            const updatedSteps = task.steps.map((step) => {
                                if (step.stepId === stepId) {
                                    return {
                                        ...step,
                                        isCompleted: !step.isCompleted,
                                    }
                                }
                                return step
                            })
                            return {
                                ...task,
                                steps: updatedSteps,
                            }
                        }
                        return task
                    })
                    return {
                        ...list,
                        tasks: updatedTasks,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: true,
            }
        }
        case "DELETE_STEP": {
            const { stepId } = payload!
            const selectedTask = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((t) => t.id === state.currentTaskId)!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    const updatedTasks = list.tasks.map((task) => {
                        if (task.id === state.currentTaskId) {
                            const updatedSteps = task.steps.filter((step) => step.stepId !== stepId)
                            return {
                                ...task,
                                steps: updatedSteps,
                            }
                        }
                        return task
                    })
                    return {
                        ...list,
                        tasks: updatedTasks,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: true,
            }
        }
        case "PROMOTE_STEP_TO_TASK": {
            const { stepId } = payload!
            const selectedTask = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((t) => t.id === state.currentTaskId)!
            let newTask: TaskProps
            state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    list.tasks.map((task) => {
                        if (task.id === state.currentTaskId) {
                            task.steps.map((step) => {
                                if (step.stepId === stepId) {
                                    const { isCompleted, text } = step
                                    newTask = {
                                        id: stepId,
                                        text: text,
                                        taskListId: selectedTask.taskListId,
                                        steps: [],
                                        dueDate: null,
                                        isCompleted: isCompleted,
                                        isToday: false,
                                        isImportant: false,
                                        isPlanned: false,
                                        note: "",
                                        createdDay: fullCurrentDay,
                                    }
                                }
                            })
                        }
                    })
                }
            })
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    return {
                        ...list,
                        tasks: [...list.tasks, newTask],
                        count: list.count + 1,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
            }
        }
        case "EDIT_NOTE": {
            const { text } = payload!
            const selectedTask = state.lists.find((list) => list.id === state.currentListId)!.tasks.find((t) => t.id === state.currentTaskId)!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === selectedTask.taskListId) {
                    const updatedTasks = list.tasks.map((task) => {
                        if (task.id === state.currentTaskId) {
                            return {
                                ...task,
                                note: text!,
                            }
                        }
                        return task
                    })
                    return {
                        ...list,
                        tasks: updatedTasks,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: true,
            }
        }
        case "TOGGLE_MAIN_TASK": {
            const { taskId, listId, toggleProperty } = payload!
            const updatedLists: ListProps[] = state.lists.map((list) => {
                if (list.id === listId) {
                    const updatedTasks = list.tasks.map((task) => {
                        if (task.id === taskId) {
                            return {
                                ...task,
                                [toggleProperty!]: !task[toggleProperty!],
                            }
                        }
                        return task
                    })
                    return {
                        ...list,
                        tasks: updatedTasks,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: true,
            }
        }
        case "MODIFY_MAIN_TASKS": {
            const updatedLists = state.lists.map((list) => {
                if (list.id === initialLists[0].id || list.id === initialLists[1].id || list.id === initialLists[2].id) {
                    let property: keyof TaskProps
                    if (list.id === initialLists[0].id) property = "isToday"
                    if (list.id === initialLists[1].id) property = "isImportant"
                    if (list.id === initialLists[2].id) property = "isPlanned"
                    const updatedTasks = list.tasks
                        .map((task) => {
                            const correspondingTaskIndex = state.lists.findIndex((l) => l.id === task.taskListId)
                            if (correspondingTaskIndex !== -1) {
                                const correspondingTask = state.lists[correspondingTaskIndex].tasks.find((t) => t.id === task.id)
                                if (correspondingTask && correspondingTask[property] === task[property]) {
                                    return correspondingTask
                                }
                            }
                            return null
                        })
                        .filter((task) => task !== null) as TaskProps[]
                    return {
                        ...list,
                        tasks: updatedTasks,
                        count: updatedTasks.length,
                    }
                }
                return list
            })
            return {
                ...state,
                lists: updatedLists,
                isModifying: false,
            }
        }
        case "TOGGLE_SEARCHING": {
            const { searchValue, isSearching } = payload!
            const filteredTasks = state.lists
                .slice(3)
                .flatMap((list) => list.tasks)
                .filter((task) => task.text.includes(searchValue!))

            return {
                ...state,
                searchTasks: filteredTasks,
                isSearching: isSearching!,
            }
        }
        case "UPDATE_LIST_RANKING": {
            const { listId, position } = payload!
            const listIndex = state.lists.findIndex((list) => list.id === listId)

            const updatedLists = [...state.lists]
            const [listToMove] = updatedLists.splice(listIndex, 1)
            updatedLists.splice(position!, 0, listToMove)

            return {
                ...state,
                lists: updatedLists,
            }
        }
        case "UPDATE_TASK_RANKING": {
            const { newTasks } = payload!

            const updatedLists = state.lists.map((list) => {
                if (list.id === state.currentListId) {
                    return {
                        ...list,
                        tasks: newTasks!,
                    }
                }
                return list
            })

            return {
                ...state,
                lists: updatedLists,
            }
        }
        default:
            return state
    }
}

type ToDoProviderProps = {
    children: React.ReactNode
}
export const ToDoProvide = ({ children }: ToDoProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [currentTask, setCurrentTask] = useState<TaskProps>(initialTask)
    const [currentList, setCurrentList] = useState<ListProps>(initialLists[0])
    const [isTaskDetailsSidebarOpen, setIsTaskDetailsSidebarOpen] = useState(false)
    const [isSuggestionbarOpen, setIsSuggestionOpen] = useState(false)

    /* REDUCER FUNCTIONS */

    // change the list and checking if we're on any of the main lists
    function changeList(listId: string) {
        dispatch({ type: "CHANGE_LIST", payload: { listId } })
    }
    // creating a new list
    function createList() {
        dispatch({ type: "CREATE_LIST" })
    }
    // delete an existing list
    function deleteList(listId: string) {
        dispatch({ type: "DELETE_LIST", payload: { listId } })
    }
    // handle edit click for a list
    const handleEditClick = (text: string, editType: "list" | "task") => {
        dispatch({ type: "HANDLE_EDIT_CLICK", payload: { text, editType } })
    }
    // edit an existing list
    function editList(listId: string, text: string) {
        dispatch({ type: "EDIT_LIST", payload: { listId, text } })
    }
    // add a task to the list
    function addTask(text?: string, listId?: string, dueDate?: Dayjs, task?: TaskProps) {
        dispatch({ type: "ADD_TASK", payload: { text, listId, dueDate, task } })
    }
    // edit an existing task
    function editTask(text: string) {
        dispatch({ type: "EDIT_TASK", payload: { text } })
    }
    // edit a task's checkbutton
    function toggleTaskStatus(listId: string, taskId: string) {
        dispatch({ type: "TOGGLE_TASK_STATUS", payload: { listId, taskId } })
    }
    // edit task's due date
    function editDueDate(dueDate: Dayjs) {
        dispatch({ type: "EDIT_DUE_DATE", payload: { dueDate } })
        const currentTask = state.lists.find((l) => l.id === state.currentListId)?.tasks.find((t) => t.id === state.currentTaskId)
        addTask(undefined, "planned-list", undefined, currentTask)
    }
    // delete task's due date
    function deleteDueDate() {
        dispatch({ type: "DELETE_DUE_DATE" })
    }
    // view a task detials
    function viewTaskDetails(taskId: string) {
        dispatch({ type: "VIEW_TASK_DETAILS", payload: { taskId } })
    }
    // add steps to a task
    function addStep(text: string) {
        dispatch({ type: "ADD_STEP", payload: { text } })
    }
    // edit a step's checkbutton
    function toggleStepStatus(stepId: string) {
        dispatch({ type: "TOGGLE_STEP_STATUS", payload: { stepId } })
    }
    // delete a step
    function deleteStep(stepId: string) {
        dispatch({ type: "DELETE_STEP", payload: { stepId } })
    }
    // promote step to task
    function promoteStepToTask(stepId: string) {
        dispatch({ type: "PROMOTE_STEP_TO_TASK", payload: { stepId } })
        dispatch({ type: "DELETE_STEP", payload: { stepId } })
    }
    // edit a task's note
    function editNote(text: string) {
        dispatch({ type: "EDIT_NOTE", payload: { text } })
    }
    // delete a task
    function deleteTask() {
        dispatch({ type: "DELETE_TASK" })
        setIsTaskDetailsSidebarOpen(false)
    }
    // toggle main lists' tasks
    function toggleMainTask(taskId: string, listId: string, toggleProperty: TogglePropertyProps) {
        dispatch({ type: "TOGGLE_MAIN_TASK", payload: { taskId, listId, toggleProperty } })
        setIsTaskDetailsSidebarOpen(false)
    }
    // toggle searching
    const toggleSearch = useCallback(
        (isSearching: boolean, searchValue?: string) => {
            dispatch({ type: "TOGGLE_SEARCHING", payload: { isSearching, searchValue } })
        },
        [dispatch]
    )
    // update list and task ranking
    const updateListRanking = (listId: string, position: number) => {
        dispatch({ type: "UPDATE_LIST_RANKING", payload: { listId, position } })
    }
    const updatedTaskRanking = (newTasks: TaskProps[]) => {
        dispatch({ type: "UPDATE_TASK_RANKING", payload: { newTasks } })
    }

    // update current list every time (currnet list id) or (lists) get updated
    useLayoutEffect(() => {
        const id = state.currentListId
        const selectedList = state.lists.find((list) => list.id === id)
        selectedList && setCurrentList(selectedList)
    }, [state.currentListId, state.lists])
    // update current task every time (current list id) or (current list) get updated
    useLayoutEffect(() => {
        const id = state.currentTaskId
        const selectedTask = currentList.tasks.find((task) => task.id === id)
        selectedTask && setCurrentTask(selectedTask)
    }, [currentList, state.currentTaskId])
    // update main lists on every change
    useEffect(() => {
        if (state.isModifying) {
            dispatch({ type: "MODIFY_MAIN_TASKS" })
        }
    }, [state.isModifying])

    /* SIDEBAR FUNCTIONS */

    // toggle task sidebar details
    function openTaskDetailsSidebar() {
        setIsTaskDetailsSidebarOpen(true)
        setIsSuggestionOpen(false)
    }
    function closeTaskDetailsSidebar() {
        setIsTaskDetailsSidebarOpen(false)
    }
    useEffect(() => {
        setIsTaskDetailsSidebarOpen(false)
    }, [state.currentListId])

    /* SUGGESTION BAR FUNCTIONS */

    // toggle tasks suggestion bar
    function openSuggestionbar() {
        setIsSuggestionOpen(true)
        setIsTaskDetailsSidebarOpen(false)
    }
    function closeSuggestionbar() {
        setIsSuggestionOpen(false)
    }
    useEffect(() => {
        setIsSuggestionOpen(false)
    }, [state.currentListId])

    // SAVE TO LOCAL STORAGE
    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(state.lists))
    }, [state.lists])

    return (
        <ToDoContext.Provider
            value={{
                currentListId: state.currentListId,
                lists: state.lists,
                changeList,
                isDayList: state.isDayList,
                isImportantList: state.isImportantList,
                isPlannedList: state.isPlannedList,
                isTasksList: state.isTasksList,
                createList,
                deleteList,
                editList,
                currentList: currentList,
                addTask,
                toggleTaskStatus,
                isTaskDetailsSidebarOpen,
                openTaskDetailsSidebar,
                closeTaskDetailsSidebar,
                currentTask,
                viewTaskDetails,
                addStep,
                toggleStepStatus,
                deleteStep,
                promoteStepToTask,
                editNote,
                noteInputValue: state.noteInputValue,
                currentTaskId: state.currentTaskId,
                deleteTask,
                toggleMainTask,
                inputEditValue: state.editInputValue,
                handleEditClick,
                isEditingList: state.isEditingList,
                isEditingTask: state.isEditingTask,
                editTask,
                editDueDate,
                deleteDueDate,
                isSuggestionbarOpen,
                openSuggestionbar,
                closeSuggestionbar,
                isSearching: state.isSearching,
                toggleSearch,
                searchTasks: state.searchTasks,
                updateListRanking,
                updatedTaskRanking,
            }}
        >
            {children}
        </ToDoContext.Provider>
    )
}
