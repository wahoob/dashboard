import { useEffect, useState } from "react"
import { currentDay, startOfMonth, generateCalendar } from "../utils"
import { Dayjs } from "dayjs"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"

type DatePickerProps = {
    changeDate: (day: Dayjs) => void
    setDatePicker: (value: boolean) => void
}
const DatePicker = ({ changeDate, setDatePicker }: DatePickerProps) => {
    const [firstDayOfMonth, setFirstDayOfMonth] = useState<Dayjs>(startOfMonth)

    const [calendarDays, setCalendarDays] = useState<Dayjs[]>([])
    useEffect(() => {
        const initialDays = generateCalendar(firstDayOfMonth.year(), firstDayOfMonth.month())
        setCalendarDays(initialDays)
    }, [firstDayOfMonth])

    return (
        <>
            <div className="text-white flex items-center justify-between mb-5">
                <p className="text-sm">
                    {firstDayOfMonth.format("MMMM")} {firstDayOfMonth.format("YYYY")}
                </p>
                <div className="flex items-center gap-4">
                    <div className="hover:text-zinc-400" onClick={() => setFirstDayOfMonth((d) => d.subtract(1, "month"))}>
                        <FaCaretUp />
                    </div>
                    <div className="hover:text-zinc-400" onClick={() => setFirstDayOfMonth((d) => d.add(1, "month"))}>
                        <FaCaretDown />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 cursor-default">
                <p>Su</p>
                <p>Mo</p>
                <p>Tu</p>
                <p>We</p>
                <p>Th</p>
                <p>Fr</p>
                <p>Sa</p>
            </div>
            <div className="grid grid-cols-7 gap-4 items-center mt-4 cursor-default">
                {calendarDays.map((day, idx) => (
                    <div
                        key={idx}
                        className={`place-self-center transition-colors border-2 border-transparent size-6 text-center ${
                            day.isSame(firstDayOfMonth, "month")
                                ? day.isSame(currentDay, "day")
                                    ? "text-orange-600 font-medium border-orange-600"
                                    : "text-white hover:border-zinc-600"
                                : "text-zinc-400 hover:border-zinc-600"
                        }`}
                        onClick={() => {
                            changeDate(day)
                            setDatePicker(false)
                        }}
                    >
                        {day.format("D")}
                    </div>
                ))}
            </div>
        </>
    )
}

export default DatePicker
