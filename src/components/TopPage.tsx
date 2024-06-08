import { ElementType } from "react"

type TopPageProps = {
    title: string
    text: string
    Icon: ElementType
}

const TopPage = ({ title, text, Icon }: TopPageProps) => {
    return (
        <div className="flex justify-between max-sm:justify-center max-sm:flex-col items-center gap-8 px-6 pt-6">
            <div className="flex items-center gap-5">
                <div className="bg-orange-600 rounded-md p-2 shadow-md">
                    <Icon className="size-6 text-white" />
                </div>
                <div>
                    <h4 className="text-md capitalize">{title}</h4>
                    <p className="text-sm text-gray-700">{text}</p>
                </div>
            </div>
            <div className="flex gap-2 items-center text-gray-600 text-sm">
                <Icon />
                <span>/</span>
                <p>{title}</p>
            </div>
        </div>
    )
}

export default TopPage
