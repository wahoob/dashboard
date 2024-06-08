import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    TooltipPositionerFunction,
    ChartType,
    TooltipItem,
} from "chart.js"
import { Bar } from "react-chartjs-2"

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

const data = {
    labels: ["India", "Australia", "Canada", "America", ".uxembrug"],
    datasets: [
        {
            data: [38644, 28644, 24644, 45000, 33644],
            backgroundColor: "#f8c7ae",
            barPercentage: 0.8,
        },
        {
            data: [40000, 35000, 35000, 55000, 42000],
            backgroundColor: "#E3E6ED",
            barPercentage: 0.8,
        },
        {
            data: [60000, 60000, 60000, 60000, 60000],
            backgroundColor: "#EFF2F6",
            barPercentage: 0.8,
        },
    ],
}

const options = {
    indexAxis: "y" as const,
    hover: {
        mode: null!,
    },
    scales: {
        x: {
            border: {
                display: false,
            },
            grid: {
                display: false,
            },
            ticks: {
                maxTicksLimit: 5,
            },
        },
        y: {
            border: {
                display: false,
            },
            grid: {
                display: false,
            },
            ticks: {
                // padding: 50,
            },
            stacked: true,
        },
    },
    plugins: {
        tooltip: {
            displayColors: false,
            position: "myCustomPositioner" as const,
            callbacks: {
                label: (tooltipItem: TooltipItem<"bar">) => {
                    const gained = data.datasets[0].data[tooltipItem.dataIndex]
                    const target = data.datasets[1].data[tooltipItem.dataIndex]
                    return [`● Target: $${target}`, `● Gained: $${gained}`]
                },
            },
            backgroundColor: "#e0e3eb",
            titleColor: "black",
            bodyColor: "black",
            padding: 12,
        },
    },
}

const HorizontalBarChartElement = () => {
    return <Bar data={data} options={options} />
}

export default HorizontalBarChartElement
