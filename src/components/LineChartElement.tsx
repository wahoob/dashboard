import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"
import zoomPlugin from "chartjs-plugin-zoom"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    zoomPlugin,
    Filler
)

const deals = [
    { date: "3 Jan", value: 120 },
    { date: "7 Jan", value: 160 },
    { date: "12 Jan", value: 155 },
    { date: "16 Jan", value: 130 },
    { date: "21 Jan", value: 155 },
    { date: "23 Jan", value: 150 },
    { date: "25 Jan", value: 145 },
    { date: "27 Jan", value: 150 },
    { date: "29 Jan", value: 160 },
    { date: "31 Jan", value: 140 },
    { date: "2 Feb", value: 145 },
    { date: "5 Feb", value: 140 },
    { date: "8 Feb", value: 132 },
    { date: "12 Feb", value: 137 },
    { date: "15 Feb", value: 130 },
    { date: "17 Feb", value: 125 },
    { date: "20 Feb", value: 155 },
    { date: "22 Feb", value: 130 },
    { date: "24 Feb", value: 145 },
    { date: "26 Feb", value: 150 },
    { date: "2 Mar", value: 137 },
    { date: "5 Mar", value: 130 },
    { date: "7 Mar", value: 160 },
    { date: "11 Mar", value: 128 },
    { date: "14 Mar", value: 165 },
    { date: "16 Mar", value: 130 },
    { date: "19 Mar", value: 125 },
    { date: "21 Mar", value: 145 },
    { date: "24 Mar", value: 135 },
    { date: "26 Mar", value: 145 },
    { date: "28 Mar", value: 150 },
    { date: "1 Apr", value: 128 },
    { date: "4 Apr", value: 130 },
    { date: "7 Apr", value: 160 },
    { date: "10 Apr", value: 132 },
    { date: "13 Apr", value: 125 },
    { date: "15 Apr", value: 140 },
    { date: "18 Apr", value: 135 },
    { date: "20 Apr", value: 155 },
    { date: "23 Apr", value: 170 },
    { date: "26 Apr", value: 145 },
    { date: "29 Apr", value: 160 },
]

const data = {
    labels: deals.map((deal) => deal.date),
    datasets: [
        {
            data: deals.map((deal) => deal.value),
            backgroundColor: "rgba(234,88,12,0.4)",
            borderColor: "#EA580C",
            tension: 0.3,
            fill: true,
            pointBackgroundColor: "white",
            pointHoverBackgroundColor: "#EA580C",
            pointRadius: 2.5,
        },
    ],
}
const options = {
    scales: {
        x: {
            // max: 10,
            // stackWeight: 1.5,
            ticks: {
                maxTicksLimit: 10,
            },
            scroll: {
                enabled: true,
            },
        },
        y: {
            border: {
                display: false,
            },
        },
    },
    plugins: {
        zoom: {
            pan: {
                enabled: true,
                mode: "x" as const,
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true,
                },
                mode: "x" as const,
            },
        },
        tooltip: {
            displayColors: false,
            yAlign: "bottom" as const,
            bodyAlign: "center" as const,
        },
    },
}

const LineChartElement = () => {
    return <Line options={options} data={data} />
}

export default LineChartElement
