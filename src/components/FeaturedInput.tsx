import { useContext, useEffect, useRef, useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { RxCross1 } from "react-icons/rx"
import { ToDoContext } from "../context/toDoContext"

const FeaturedInput = () => {
    const { isSearching, toggleSearch } = useContext(ToDoContext)
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState("")
    useEffect(() => {
        if (inputValue !== "") {
            toggleSearch(true, inputValue)
        } else {
            toggleSearch(false)
            inputRef.current!.blur()
        }
    }, [inputValue, toggleSearch])

    return (
        <div className="relative mx-3.5 mb-1">
            <input
                ref={inputRef}
                className={`pl-2 ${
                    isSearching ? "pr-[4.5rem]" : "pr-10"
                } py-1.5 w-full bg-transparent rounded-md text-sm outline-0 border-x border-t border-neutral-300 border-b-2 border-b-zinc-300 transition-colors focus:border-b-[3px] focus:border-b-orange-600 placeholder-neutral-400`}
                placeholder="Search"
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
                value={inputValue}
                onFocus={() => inputValue !== "" && toggleSearch(true, inputValue)}
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center gap-0.5">
                {isSearching && (
                    <div className="hover:bg-zinc-300 transition-colors px-1.5 py-1 rounded-md" onClick={() => setInputValue("")}>
                        <RxCross1 className="text-neutral-400 text-lg" />
                    </div>
                )}
                <div className="hover:bg-zinc-300 transition-colors px-1.5 py-1 rounded-md" onClick={() => inputRef.current?.focus()}>
                    <IoIosSearch className="text-neutral-400" />
                </div>
            </div>
        </div>
    )
}

export default FeaturedInput
