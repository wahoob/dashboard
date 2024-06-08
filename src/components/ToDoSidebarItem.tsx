import { ElementType, useContext } from "react"
import { ToDoContext } from "../context/toDoContext"
import { GrEdit } from "react-icons/gr"
import { RxCross2 } from "react-icons/rx"
import ResizableInput from "./ResizableInput"

type ToDoSidebarItemProps = {
    Icon: ElementType
    text: string
    color?: string
    count: number
    editable?: boolean
    id: string
    setActiveSidebarItem?: (value: string | null) => void
}
const ToDoSidebarItem = ({ Icon, text, color = "#EA580C", count, editable = false, id, setActiveSidebarItem }: ToDoSidebarItemProps) => {
    const { changeList, currentListId, deleteList, handleEditClick, isEditingList, editList, isSearching } = useContext(ToDoContext)
    const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        deleteList(id)
    }
    const handleEdit = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        changeList(id)
        handleEditClick(text, "list")
    }

    return (
        <div
            className={`transition-colors ${
                currentListId === id && !isSearching ? "bg-stone-200" : "hover:bg-stone-200"
            } py-1 rounded px-3.5 mx-1 relative flex items-center gap-1 justify-between group active:opacity-60 active:border active:border-neutral-400`}
            onClick={() => changeList(id)}
            draggable={editable}
            onDragStart={() => setActiveSidebarItem!(id)}
            onDragEnd={() => setActiveSidebarItem!(null)}
        >
            <div className="flex items-center gap-4 text-[15px] w-full">
                <Icon className="shrink-0" style={{ color: color }} />
                <ResizableInput text={text} id={id} isOpen={isEditingList} editName={editList} currentId={currentListId} />
                {currentListId === id && !isSearching && (
                    <div className="w-[3px] h-4 bg-orange-600 rounded-full absolute top-1/2 -translate-y-1/2 left-0" />
                )}
            </div>
            <div className="flex items-center gap-2">
                {editable && !isEditingList && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-[998]">
                        <div onClick={handleEdit}>
                            <GrEdit className="size-3.5 text-neutral-600 cursor-pointer" />
                        </div>
                        <div onClick={handleDelete}>
                            <RxCross2 className="text-neutral-600 cursor-pointer" />
                        </div>
                    </div>
                )}
                {count > 0 && (
                    <p className="cursor-default text-[11px] font-medium bg-stone-300 size-[18px] flex items-center justify-center rounded-full">
                        {count}
                    </p>
                )}
            </div>
        </div>
    )
}

export default ToDoSidebarItem
