import { ElementType } from "react"

type CardProps = {
    title: string
    amount: string
    date: string
    Icon: ElementType
    color: string
}

const Card = ({ title, amount, date, Icon, color }: CardProps) => {
    return (
        <div className="flex items-center justify-between bg-white p-5 shadow-md rounded-md group">
            <div className="flex flex-col justify-between gap-4 text-neutral-700">
                <p>{title}</p>
                <h3
                    className="text-2xl font-semibold"
                    style={{ color: `${color}` }}
                >
                    {amount}
                </h3>
                <p className="text-sm whitespace-nowrap">{date}</p>
            </div>
            <div
                className="p-3 rounded-lg group-hover:rounded-full"
                style={{ backgroundColor: `${color}` }}
            >
                <Icon className="text-white size-6" />
            </div>
        </div>
    )
}

export default Card
