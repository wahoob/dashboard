import {
    BarLineChartElement,
    Card,
    HorizontalBarChartElement,
    LineChartElement,
    ProgressCard,
} from "../components"
import { cardData, progressCardData } from "../data"

const Dashboard = () => {
    return (
        <div className="flex items-center gap-4 flex-wrap p-6">
            <div className="bg-white rounded-md shadow p-5 flex flex-col gap-6 flex-auto w-full lg:w-2/3 ">
                <div className="relative w-fit">
                    <h3 className="font-medium text-[15px] pb-4">
                        Deals Analytics
                    </h3>
                    <hr className="border-0 border-b border-zinc-300 w-1/2 lg:max-w-[33%]" />
                </div>
                <LineChartElement />
            </div>
            <div className="flex flex-col gap-4 min-w-[30%] flex-auto">
                {cardData.map((card, idx) => {
                    const { Icon, amount, color, date, title } = card
                    return (
                        <Card
                            key={idx}
                            title={title}
                            amount={amount}
                            date={date}
                            Icon={Icon}
                            color={color}
                        />
                    )
                })}
            </div>
            <div className="bg-white rounded-md shadow-md p-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {progressCardData.map((card, idx) => {
                    const {
                        amount,
                        progressAmount,
                        progressTextColor,
                        progressbarColor,
                        progressbarWidth,
                        title,
                    } = card
                    return (
                        <ProgressCard
                            key={idx}
                            title={title}
                            amount={amount}
                            progressAmount={progressAmount}
                            progressTextColor={progressTextColor}
                            progressbarColor={progressbarColor}
                            progressbarWidth={progressbarWidth}
                        />
                    )
                })}
            </div>
            <div className="flex w-full gap-4 flex-wrap">
                <div className="bg-orange-600 opacity-70 p-5 rounded-lg flex flex-col justify-between gap-8 shadow-lg w-full lg:w-[30%]">
                    <div className="flex items-center justify-center flex-wrap gap-5 text-white w-full">
                        <div>
                            <h3 className="text-base sm:text-lg whitespace-nowrap">
                                Sales In July
                            </h3>
                            <h2 className="text-xl font-medium">$2665.00</h2>
                        </div>
                        <div className="flex items-center gap-5 max-sm:text-sm">
                            <div className="flex flex-col items-center gap-1">
                                <p className="whitespace-nowrap">Direct Sale</p>
                                <p>$1869</p>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <p>Referal</p>
                                <p>$932</p>
                            </div>
                        </div>
                    </div>
                    <BarLineChartElement />
                </div>
                <div className="p-5 flex flex-col gap-2 bg-white shadow-lg rounded-lg w-full lg:w-2/3 flex-auto">
                    <h1 className="text-2xl font-semibold text-neutral-800">
                        Revenue Target
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Country-wise target fulfilment
                    </p>
                    <HorizontalBarChartElement />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
