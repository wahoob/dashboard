import { useContext, useEffect, useRef, useState } from "react"
import { ToDoContext } from "../context/toDoContext"

type ResizableInputProps = {
    text: string
    id: string
    isOpen: boolean
    editName: (id: string, value: string) => void
    currentId: string
}

const ResizableInput = ({ text, id, isOpen, editName, currentId }: ResizableInputProps) => {
    const { inputEditValue } = useContext(ToDoContext)
    const [inputValue, setInputValue] = useState(text)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen && inputRef.current) {
            const inputWidth = inputRef.current.scrollWidth
            const parentWidth = inputRef.current.parentElement!.offsetWidth
            if (inputWidth < parentWidth!) {
                inputRef.current.style.width = `${inputValue.length + 3}ch`
            }
        }
    }, [isOpen, inputValue])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.select()
        }
    }, [isOpen])

    useEffect(() => {
        setInputValue(inputEditValue)
    }, [inputEditValue])

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        editCurrentName()
    }
    const editCurrentName = () => {
        editName(id, inputValue)
    }

    return (
        <>
            {isOpen && id === currentId ? (
                <form className="w-full" onSubmit={handleSumbit}>
                    <input
                        className="font-mono font-medium text-sm bg-transparent outline-0 border border-b-[3px] border-b-orange-600 border-neutral-400 rounded-md px-2 py-0.5"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        ref={inputRef}
                        onBlur={() => editCurrentName()}
                    />
                </form>
            ) : (
                <p className="cursor-default flex-1 max-w-40 break-all line-clamp-1">{text}</p>
            )}
        </>
    )
}

export default ResizableInput
