import { MdDashboard, MdOutlineEmail, MdEmail, MdOutlineShoppingCart, MdOutlineTimeline, MdOutlineInbox } from "react-icons/md"
import { FaUser, FaCheckDouble, FaCalendarAlt, FaEye, FaRegStar, FaCalendarDay, FaRegCalendarPlus } from "react-icons/fa"
import { TiShoppingCart } from "react-icons/ti"
import { PiTreeStructureFill } from "react-icons/pi"
import { CgNotes } from "react-icons/cg"
import { GoGoal, GoPencil } from "react-icons/go"
import { GiGooeyImpact } from "react-icons/gi"
import { RiSendPlaneLine, RiSpam2Line } from "react-icons/ri"
import { FiTrash, FiArchive } from "react-icons/fi"
import { email1, email2, email3, email4, email5 } from "./assets"
import { FaCalendarDays, FaFilePdf, FaFileZipper, FaMusic } from "react-icons/fa6"
import { currentDay, nextWeekDay, tomorrowDay } from "./utils"

// sidebar data
export const dashboardMainOptions = [
    {
        Icon: MdDashboard,
        title: "dashboard",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "dashboard",
    },
    {
        Icon: MdEmail,
        title: "emails",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "emails",
    },
]
export const dashboardListsOptions = [
    {
        Icon: FaUser,
        title: "customers",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "customers",
    },
    {
        Icon: TiShoppingCart,
        title: "products",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "products",
    },
    {
        Icon: MdOutlineShoppingCart,
        title: "orders",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "orders",
    },
    {
        Icon: MdOutlineEmail,
        title: "messages",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "messages",
    },
]
export const dashboardGeneralOptions = [
    {
        Icon: FaCheckDouble,
        title: "toDo",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "toDo",
    },
    {
        Icon: FaCalendarAlt,
        title: "calendar",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "calendar",
    },
    {
        Icon: PiTreeStructureFill,
        title: "nestable",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "nestable",
    },
    {
        Icon: MdOutlineTimeline,
        title: "timeLine",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "timeLine",
    },
    {
        Icon: CgNotes,
        title: "notes",
        text: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
        link: "notes",
    },
]
export const allSidebarOptions = [dashboardMainOptions, dashboardListsOptions, dashboardGeneralOptions].flat()

// dashboard data
export const cardData = [
    {
        title: "Impressions",
        amount: "1,632",
        date: "May 23 - June 01 (2023)",
        Icon: FaEye,
        color: "#EA580C",
    },
    {
        title: "Goal",
        amount: "30,564",
        date: "May 23 - June 01 (2020)",
        Icon: GoGoal,
        color: "#818CF8",
    },
    {
        title: "Impact",
        amount: "42.6%",
        date: "May 23 - June 01 (2024)",
        Icon: GiGooeyImpact,
        color: "#525252",
    },
]
export const progressCardData = [
    {
        title: "Completed Tasks",
        amount: "245",
        progressAmount: "-0.5%",
        progressTextColor: "#FF5370",
        progressbarColor: "#2ED8B6",
        progressbarWidth: 40,
    },
    {
        title: "Total Sales",
        amount: "$12,450",
        progressAmount: "+3.8%",
        progressTextColor: "#2ED8B6",
        progressbarColor: "#FF5370",
        progressbarWidth: 80,
    },
    {
        title: "New Customers",
        amount: "87",
        progressAmount: "+2.1%",
        progressTextColor: "#2ED8B6",
        progressbarColor: "#FF5370",
        progressbarWidth: 20,
    },
    {
        title: "Revenue Growth",
        amount: "+$1,256",
        progressAmount: "+0.9%",
        progressTextColor: "#2ED8B6",
        progressbarColor: "#FF5370",
        progressbarWidth: 50,
    },
]

// emails data
export const mailboxData = [
    { Icon: MdOutlineInbox, title: "inbox", notifications: 8 },
    { Icon: RiSendPlaneLine, title: "sent", notifications: 14 },
    { Icon: GoPencil, title: "draft" },
    { Icon: RiSpam2Line, title: "spam" },
    { Icon: FiTrash, title: "trash" },
]
export const filteredData = [
    { Icon: FaRegStar, title: "Starred" },
    { Icon: FiArchive, title: "Archive" },
]
export const labelsData = [
    { color: "#3874FF", title: "Personal" },
    { color: "#004DFF", title: "Work" },
    { color: "#25B003", title: "Payments" },
    { color: "#E5780B", title: "Invoices" },
    { color: "#EC1F00", title: "Accounts" },
    { color: "#0097EB", title: "Forums" },
]
export const emails = [
    {
        image: email1,
        name: "Jessica Ball",
        email: "jessica.ball@email.com",
        favourite: true,
        date: "28 Aug, 2021 6:32 PM",
        title: "Query about purchased soccer socks",
        text: "Hello! As I've mentioned before, we have this huge order deals to ship within this month. Also, the financial report is attached to this email. Hopefully, you'll find it useful for the company.",
    },
    {
        image: email2,
        name: "Emily Johnson",
        email: "emily.johnson@email.com",
        favourite: true,
        date: "10 Mar, 2023 3:45 PM",
        title: "Proposal for upcoming marketing campaign",
        text: "Hi team! Attached is the proposal for our upcoming marketing campaign. Please review and provide feedback at your earliest convenience. Thanks!",
        attachments: [
            {
                name: "Financiial_reports.pdf",
                Icon: FaFilePdf,
                size: "53.34KB",
            },
            { name: "Frame20.zip", Icon: FaFileZipper, size: "211.42KB" },
        ],
    },
    {
        image: email3,
        name: "Sarah Brown",
        email: "sarah.brown@email.com",
        favourite: false,
        date: "14 Sep, 2023 2:55 PM",
        title: "Feedback on recent product demo",
        text: "Hi team, I attended the product demo yesterday and wanted to share some feedback. Please see the attached document for my detailed comments. Let's discuss further in our next meeting. Thanks!",
    },
    {
        name: "David Lee",
        email: "david.lee@email.com",
        favourite: false,
        date: "8 Jan, 2024 11:30 AM",
        title: "Request for additional resources",
        text: "Hello everyone, I hope this email finds you well. I'm reaching out to request additional resources for our project. Please review the attached resource plan and let me know your thoughts. Thanks!",
    },
    {
        image: email4,
        name: "Olivia Wilson",
        email: "olivia.wilson@email.com",
        favourite: true,
        date: "20 Jul, 2023 4:10 PM",
        title: "Invitation to team-building event",
        text: "Hi team, I'm excited to invite you all to a team-building event next month. Please see the attached invitation for details and RSVP by the end of the week. Looking forward to it!",
    },
    {
        name: "Andrew Taylor",
        email: "andrew.taylor@email.com",
        favourite: false,
        date: "12 Aug, 2024 9:00 AM",
        title: "Discussion on project timeline",
        text: "Hi team, I hope you're all doing well. I'd like to schedule a meeting to discuss our project timeline and any potential adjustments that need to be made. Please see the attached document for reference. Let me know your availability. Thanks!",
        attachments: [{ name: "borderline", Icon: FaMusic, size: "421.93KB" }],
    },
    {
        image: email5,
        name: "Sophia Martinez",
        email: "sophia.martinez@email.com",
        favourite: false,
        date: "18 May, 2023 10:55 AM",
        title: "Reminder: Quarterly review meeting",
        text: "Hello team, just a friendly reminder that our quarterly review meeting is scheduled for next week. Please review the attached agenda and prepare any necessary materials in advance. Looking forward to productive discussions!",
    },
    {
        name: "Daniel Garcia",
        email: "daniel.garcia@email.com",
        favourite: true,
        date: "3 Feb, 2024 1:25 PM",
        title: "Discussion on budget allocation",
        text: "Hi everyone, I hope you're doing well. I wanted to initiate a discussion on budget allocation for our upcoming projects. Please review the attached budget proposal and come prepared to share your thoughts in our next meeting. Thanks!",
    },
]

// toDo data
export const dueDateData = [
    {
        Icon: FaCalendarDay,
        text: "Today",
        day: currentDay,
    },
    {
        Icon: FaRegCalendarPlus,
        text: "Tomorrow",
        day: tomorrowDay,
    },
    {
        Icon: FaCalendarDays,
        text: "Next week",
        day: nextWeekDay,
    },
]
