import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    TooltipItem,
    TooltipPositionerFunction,
    ChartType,
} from "chart.js"
import { Bar, Line } from "react-chartjs-2"

declare module "chart.js" {
    interface TooltipPositionerMap {
        myCustomPositioner: TooltipPositionerFunction<ChartType>
    }
}
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

Tooltip.positioners.myCustomPositioner = function (_, eventPosition) {
    const x = eventPosition.x
    const y = eventPosition.y
    return { x, y }
}

const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
const salesData = [
    800, 1400, 700, 1200, 900, 1600, 1100, 1300, 1000, 1500, 850, 1350,
]

const barData = {
    labels,
    datasets: [
        {
            data: salesData,
            backgroundColor: "#f8c7ae",
        },
    ],
}
const lineData = {
    labels,
    datasets: [
        {
            data: salesData,
            backgroundColor: "white",
            borderColor: "white",
            tension: 0.03,
        },
    ],
}

const barOptions = {
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
            border: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
            border: {
                display: false,
            },
        },
    },
    plugins: {
        tooltip: {
            position: "myCustomPositioner" as const,
            displayColors: false,
            callbacks: {
                label: (tooltipItem: TooltipItem<"bar">) => {
                    const value =
                        tooltipItem.dataset.data[tooltipItem.dataIndex]
                    return `$${value}`
                },
                title: () => "",
            },
        },
    },
}
const lineOptions = {
    scales: {
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,
                // stepSize: 3000,
            },
        },
    },
    plugins: {
        tooltip: {
            displayColors: false,
            callbacks: {
                label: (tooltip: TooltipItem<"line">) => {
                    const value = tooltip.dataset.data[tooltip.dataIndex]
                    return `$${value}`
                },
                title: () => "",
            },
        },
    },
}

const BarLineChartElement = () => {
    return (
        <>
            <Line
                className="max-h-[18%]"
                data={lineData}
                options={lineOptions}
            />
            <Bar data={barData} options={barOptions} />
        </>
    )
}

export default BarLineChartElement
