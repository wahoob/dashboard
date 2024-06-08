import { useContext, useState } from "react"
import { ToDoContext } from "../context/toDoContext"
import { TaskDetails, TasksSuggestion, ToDoSidebar, ToDoTasks } from "../containers"

const ToDo = () => {
    const { isDayList } = useContext(ToDoContext)
    const [isToDoSidebarOpen, setIsToDoSidebarOpen] = useState(false)

    return (
        <div className="flex md:pl-6 pt-6 px-2">
            {/* sidebar */}
            <ToDoSidebar isToDoSidebarOpen={isToDoSidebarOpen} setIsToDoSidebarOpen={setIsToDoSidebarOpen} />
            {/* tasks */}
            <ToDoTasks setIsToDoSidebarOpen={setIsToDoSidebarOpen} />
            {/* task details */}
            <TaskDetails />
            {/* day suggestion */}
            {isDayList && <TasksSuggestion />}
        </div>
    )
}

export default ToDo
