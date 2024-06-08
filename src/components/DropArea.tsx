import { useState } from "react"

type DropAreaProps = {
    index: number
    onDrop: (position: number) => void
    size: 3.5 | 2
}
const DropArea = ({ index, onDrop, size }: DropAreaProps) => {
    const [showDrop, setShowDrop] = useState(false)
    return (
        <div
            onDragEnter={() => setShowDrop(true)}
            onDragLeave={() => setShowDrop(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
                onDrop(index)
                setShowDrop(false)
            }}
            className={`w-full border-dashed border-2 border-black transition-all h-1 ${
                showDrop ? `opacity-100 ${size === 3.5 ? "min-h-14" : "min-h-8"}` : "opacity-0 min-h-0"
            }`}
        />
    )
}

export default DropArea
