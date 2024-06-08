type ProgressCardProps = {
    title: string
    amount: string
    progressAmount: string
    progressTextColor: string
    progressbarColor: string
    progressbarWidth: number
}

const ProgressCard = ({
    title,
    amount,
    progressAmount,
    progressTextColor,
    progressbarColor,
    progressbarWidth,
}: ProgressCardProps) => {
    return (
        <div className="w-full">
            <h3 className="mb-2 whitespace-nowrap">{title}</h3>
            <div className="flex items-center gap-4 mb-7">
                <p className="font-semibold text-lg">{amount}</p>
                <p
                    className="font-semibold text-lg"
                    style={{ color: progressTextColor }}
                >
                    {progressAmount}
                </p>
            </div>
            <div className="bg-[#E9ECEF] rounded-full w-full h-1.5">
                <div
                    className={`h-full relative`}
                    style={{
                        backgroundColor: progressbarColor,
                        width: `${progressbarWidth}%`,
                    }}
                >
                    <div
                        className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white size-4 border-[3px] rounded-full"
                        style={{ borderColor: progressbarColor }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProgressCard
