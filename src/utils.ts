import dayjs from "dayjs"

export const currentDay = dayjs()
export const tomorrowDay = dayjs().add(1, "day")
export const nextWeekDay = dayjs().add(7, "day")
export const startOfMonth = dayjs().startOf("month")

export const fullCurrentDay = `${currentDay.format("ddd")}, ${currentDay.format("MMM")} ${currentDay.format("D")}`

export function generateCalendar(year: number, month: number) {
    const startOfMonth = dayjs(new Date(year, month, 1))
    const startCalendar = startOfMonth.startOf("week")

    let currentDate = startCalendar
    const calendarDays = []
    while (calendarDays.length < 42) {
        calendarDays.push(currentDate)
        currentDate = currentDate.add(1, "day")
    }

    return calendarDays
}
