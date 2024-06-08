import { IoIosSearch, IoMdAdd } from "react-icons/io"
import { IoMenu, IoCloseSharp } from "react-icons/io5"
import { TbReload } from "react-icons/tb"
import {
    FaArchive,
    FaTrash,
    FaStar,
    FaTag,
    FaRegStar,
    FaPlus,
    FaChevronLeft,
    FaReply,
    FaTrashAlt,
    FaReplyAll,
} from "react-icons/fa"
import {
    MdChevronLeft,
    MdChevronRight,
    MdOutlineAttachment,
} from "react-icons/md"
import { HiPrinter } from "react-icons/hi2"
import { filteredData, labelsData, mailboxData, emails } from "../data"
import { ElementType, useState } from "react"

type DetailsProps = {
    image?: string
    name: string
    email: string
    favourite: boolean
    date: string
    title: string
    text: string
    attachments?: {
        name: string
        Icon: ElementType
        size: string
    }[]
}

const Emails = () => {
    const [isMailSidebarOpen, setIsMailSidebarOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)
    const [details, setDetails] = useState({} as DetailsProps)
    const handleDetails = ({
        favourite,
        image,
        name,
        title,
        text,
        attachments,
        email,
        date,
    }: DetailsProps) => {
        setDetails({
            favourite,
            image,
            name,
            title,
            text,
            attachments,
            email,
            date,
        })
        setOpenDetails(true)
    }
    const { date, email, favourite, name, title, attachments, image } = details
    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center gap-4 lg:gap-12 sticky -top-0 bg-zinc-50 py-4 z-[99]">
                <div className="flex items-center gap-4 md:flex-1">
                    <button
                        className="border py-2 px-3 rounded-md lg:hidden hover:bg-zinc-100"
                        onClick={() => setIsMailSidebarOpen(true)}
                    >
                        <IoMenu className="size-5" />
                    </button>
                    <button className="bg-orange-600 rounded-md text-xs text-white w-full py-2.5 px-8 font-medium lg:min-w-60 max-sm:hidden hover:bg-orange-700">
                        Compose
                    </button>
                    <button className="border py-2 px-3 rounded-md sm:hidden hover:bg-zinc-100">
                        <FaPlus className="size-5" />
                    </button>
                </div>
                <form className="relative flex-[3.5]">
                    <input
                        className="flex-[3.5] bg-zinc-100 w-full py-2.5 pl-10 pr-8 rounded-md text-xs outline-none border border-neutral-400 focus:border-orange-600 transition-colors"
                        placeholder="Search"
                    />
                    <IoIosSearch className="absolute left-3 z-10 top-1/2 -translate-y-1/2 text-neutral-600" />
                </form>
            </div>
            <div className="flex gap-12">
                {isMailSidebarOpen && (
                    <div
                        onClick={() => setIsMailSidebarOpen(false)}
                        className="lg:hidden fixed inset-0 top-[4.2rem] z-[998] bg-neutral-800 opacity-20"
                    />
                )}
                <div
                    className={`flex-1 h-[27rem] overflow-y-auto scrollbar-hidden flex flex-col gap-8 pt-4 sticky lg:top-16 min-w-60 max-lg:fixed max-lg:h-full top-[4.2rem] transition-all duration-300 ${
                        isMailSidebarOpen ? "left-0" : "-left-full"
                    } max-lg:px-2 bg-zinc-50 z-[998]`}
                >
                    <div
                        className="absolute right-2 cursor-pointer lg:hidden"
                        onClick={() => setIsMailSidebarOpen(false)}
                    >
                        <IoCloseSharp className="text-neutral-600" />
                    </div>
                    <MailSidebarSection title="mailbox">
                        {mailboxData.map((mailbox, idx) => {
                            const { Icon, title, notifications } = mailbox
                            return (
                                <MailSidebarItem
                                    key={idx}
                                    Icon={Icon}
                                    title={title}
                                    notificationCount={notifications}
                                />
                            )
                        })}
                    </MailSidebarSection>
                    <MailSidebarSection title="filtered" itemType="folder">
                        {filteredData.map((folder, idx) => {
                            const { Icon, title } = folder
                            return (
                                <MailSidebarItem
                                    key={idx}
                                    Icon={Icon}
                                    title={title}
                                />
                            )
                        })}
                    </MailSidebarSection>
                    <MailSidebarSection title="labels" itemType="label">
                        {labelsData.map((label, idx) => {
                            const { color, title } = label
                            return (
                                <MailSidebarItem
                                    key={idx}
                                    color={color}
                                    title={title}
                                />
                            )
                        })}
                    </MailSidebarSection>
                </div>
                <div className="flex-[3.5]">
                    {!openDetails && (
                        <>
                            <div className="flex items-center justify-between pt-4 pb-3 sticky top-16 bg-zinc-50 flex-wrap gap-x-4 gap-y-1 z-20">
                                <div className="flex items-center gap-2 text-xs">
                                    <TbReload className="cursor-pointer size-3 text-orange-600" />
                                    <p className="text-neutral-500">
                                        Last refreshed 1m ago
                                    </p>
                                </div>
                                <div className="flex gap-2 text-sm">
                                    <p className="text-neutral-500">
                                        Showing:{" "}
                                        <span className="text-neutral-900">
                                            1-7
                                        </span>{" "}
                                        of{" "}
                                        <span className="text-neutral-900">
                                            205
                                        </span>
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <MdChevronLeft className="size-4 text-neutral-400 cursor-pointer" />
                                        <MdChevronRight className="size-4 text-orange-600 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                            <div className="border-y py-3 pr-4 text-xs flex justify-between items-center">
                                <input type="checkbox" />
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <IconWithPlaceholder
                                        Icon={FaArchive}
                                        text="Archive"
                                    />
                                    <IconWithPlaceholder
                                        Icon={FaTrash}
                                        text="Delete"
                                    />
                                    <IconWithPlaceholder
                                        Icon={FaStar}
                                        text="Star"
                                    />
                                    <IconWithPlaceholder
                                        Icon={FaTag}
                                        text="Tags"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div>
                        {openDetails ? (
                            <div className="bg-zinc-100 p-8 border rounded-lg shadow-inner flex flex-col gap-8 overflow-y-auto h-[27.5rem] scrollbar-hidden">
                                <div className="flex items-center gap-4 pb-4 border-b border-b-zinc-300">
                                    <FaChevronLeft
                                        className="cursor-pointer"
                                        onClick={() => setOpenDetails(false)}
                                    />
                                    <h1 className="md:text-2xl font-semibold">
                                        {title}
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-20">
                                    <div className="flex items-center justify-between flex-wrap gap-y-4 gap-x-8">
                                        <div className="flex items-center gap-2">
                                            <div className="shrink-0">
                                                {image ? (
                                                    <img
                                                        className="size-11 rounded-full"
                                                        src={image}
                                                        alt={name}
                                                    />
                                                ) : (
                                                    <div className="size-11 bg-orange-300 text-orange-600 text-3xl font-bold rounded-full flex items-center justify-center">
                                                        {name[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-x-2.5 flex-wrap">
                                                    <h3 className="font-medium">
                                                        {name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 font-thin whitespace-nowrap">
                                                        {"< "}
                                                        {email}
                                                        {" >"}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-neutral-600">
                                                    to{" "}
                                                    <span className="font-semibold text-sm">
                                                        Me
                                                    </span>{" "}
                                                    {date}{" "}
                                                    {favourite ? (
                                                        <FaStar className="inline-block size-3.5 text-orange-600" />
                                                    ) : (
                                                        <FaRegStar className="inline-block size-3.5 text-orange-600" />
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-7">
                                            <IconWithPlaceholder
                                                Icon={FaReply}
                                                text="Reply"
                                                size="big"
                                            />
                                            <IconWithPlaceholder
                                                Icon={FaTrashAlt}
                                                text="Remove"
                                                size="big"
                                            />
                                            <IconWithPlaceholder
                                                Icon={FaArchive}
                                                text="Archive"
                                                size="big"
                                            />
                                            <IconWithPlaceholder
                                                Icon={HiPrinter}
                                                text="Print"
                                                size="big"
                                            />
                                            <IconWithPlaceholder
                                                Icon={FaRegStar}
                                                text="Star"
                                                size="big"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs font-thin">
                                        Dear Simp sons, <br />
                                        <br /> Something in a thirty-acre
                                        thermal thicket of thorns and thistles
                                        thumped and thundered threatening the
                                        three-D thoughts of Matthew the thug -
                                        although, theatrically, it was only the
                                        thirteen-thousand thistles and thorns
                                        through the underneath of his thigh that
                                        the thirty year old thug thought of that
                                        morning.
                                        <br />
                                        <br /> How much caramel can a canny
                                        canonball cram in a camel if a canny
                                        canonball can cram caramel in a camel?
                                        If practice makes perfect and perfect
                                        needs practice, I’m perfectly practiced
                                        and practically perfect.
                                        <br />
                                        <br /> Best regards,
                                        <br />
                                        Jess
                                    </p>
                                    {attachments && (
                                        <div className="flex flex-col gap-8">
                                            <div className="flex items-center gap-2">
                                                <MdOutlineAttachment className="size-6" />
                                                <p>
                                                    {attachments.length}{" "}
                                                    Attachments
                                                </p>
                                            </div>
                                            <div className="flex gap-4 flex-wrap">
                                                {attachments.map(
                                                    (attachment, idx) => {
                                                        const {
                                                            Icon,
                                                            name,
                                                            size,
                                                        } = attachment
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="flex gap-4 items-center cursor-pointer"
                                                            >
                                                                <div className="border-2 p-3 rounded-lg flex items-center justify-center">
                                                                    <Icon className="size-5 text-orange-600" />
                                                                </div>
                                                                <div className="text-xs">
                                                                    <p className="font-medium">
                                                                        {name}
                                                                    </p>
                                                                    <p className="text-neutral-600 font-thin">
                                                                        {size}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between text-[13px] flex-wrap gap-2">
                                    <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                                        <button className="flex items-center gap-2 border border-neutral-300 px-5 py-2 rounded bg-zinc-200 hover:bg-zinc-300 transition-colors shrink-0">
                                            Reply <FaReply />
                                        </button>
                                        <button className="flex items-center gap-2 border border-neutral-300 px-5 py-2 rounded bg-zinc-200 hover:bg-zinc-300 transition-colors shrink-0">
                                            Reply All <FaReplyAll />
                                        </button>
                                    </div>
                                    <button className="flex items-center gap-2 border border-neutral-300 px-5 py-2 rounded bg-zinc-200 hover:bg-zinc-300 transition-colors shrink-0">
                                        Forward{" "}
                                        <FaReply className="rotate-180" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            emails.map((email, idx) => {
                                const {
                                    favourite,
                                    image,
                                    name,
                                    title,
                                    text,
                                    attachments,
                                } = email
                                return (
                                    <div
                                        key={idx}
                                        className="text-xs py-3 border-b pr-4"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2.5">
                                                <input type="checkbox" />
                                                <div className="cursor-pointer">
                                                    {favourite ? (
                                                        <FaStar className="size-3 text-orange-600" />
                                                    ) : (
                                                        <FaRegStar className="size-3 text-orange-600" />
                                                    )}
                                                </div>
                                                {image ? (
                                                    <img
                                                        className="size-6 rounded-full"
                                                        src={image}
                                                        alt={name}
                                                    />
                                                ) : (
                                                    <div className="bg-orange-200 font-bold text-sm size-6 rounded-full text-orange-600 flex items-center justify-center">
                                                        {name[0]}
                                                    </div>
                                                )}
                                                <h3 className="font-semibold text-neutral-700">
                                                    {name}
                                                </h3>
                                            </div>
                                            <p className="text-neutral-500">
                                                1M
                                            </p>
                                        </div>
                                        <div className="ml-20 flex flex-col gap-0.5">
                                            <p
                                                className="text-neutral-600 font-medium cursor-pointer"
                                                onClick={() =>
                                                    handleDetails(email)
                                                }
                                            >
                                                {title}
                                            </p>
                                            <p
                                                className="text-neutral-500 line-clamp-2 cursor-pointer"
                                                onClick={() =>
                                                    handleDetails(email)
                                                }
                                            >
                                                {text}
                                            </p>
                                            <div className="flex items-center gap-x-2 flex-wrap">
                                                {attachments?.map(
                                                    (attachment, idx) => {
                                                        const { Icon, name } =
                                                            attachment
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="flex items-center gap-2 px-4 py-1 rounded-full text-[0.65rem] font-medium text-neutral-600 border mt-2 cursor-pointer hover:bg-zinc-100"
                                                            >
                                                                <Icon
                                                                    className={`${
                                                                        !(
                                                                            name ===
                                                                            "borderline"
                                                                        ) &&
                                                                        "text-orange-600"
                                                                    } size-3.5`}
                                                                />
                                                                <p>{name}</p>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

type IconWithPlaceholderProps = {
    Icon: ElementType
    text: string
    size?: string
}
const IconWithPlaceholder = ({
    Icon,
    text,
    size = "small",
}: IconWithPlaceholderProps) => {
    return (
        <div className="relative">
            <Icon
                className={`hover:text-neutral-700 cursor-pointer peer ${
                    size === "big" ? "size-3.5" : "size-2.5"
                }`}
            />
            <div className="absolute flex-col items-center bottom-4 left-1/2 -translate-x-1/2 opacity-0 flex peer-hover:opacity-100 z-[998] transition-opacity duration-200 pointer-events-none">
                <div className="text-white bg-black p-2 bg-opacity-85 rounded-md text-xs">
                    {text}
                </div>
                <div className="border-x-8 border-x-transparent border-t-8 border-t-black h-0 w-0" />
            </div>
        </div>
    )
}

type MailSidebarSectionProps = {
    children: React.ReactNode
    title: string
    itemType?: string
}
const MailSidebarSection = ({
    children,
    title,
    itemType,
}: MailSidebarSectionProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-medium pr-1">
                <h3 className="uppercase">{title}</h3>
                {itemType && (
                    <div className="flex items-center gap-1.5 text-orange-600 cursor-pointer hover:text-orange-700 transition-colors group">
                        <IoMdAdd className="size-3.5" />
                        <a className="group-hover:underline">Add {itemType}</a>
                    </div>
                )}
            </div>
            <div className="border-r border-b flex flex-col">{children}</div>
        </div>
    )
}

type MailSidebarItemProps = {
    Icon?: ElementType
    color?: string
    title: string
    notificationCount?: number
}
const MailSidebarItem = ({
    Icon,
    color,
    title,
    notificationCount,
}: MailSidebarItemProps) => {
    return (
        <div className="flex items-center justify-between border-t py-1.5 pr-2.5 cursor-pointer hover:text-orange-600 transition-colors text-[13px] text-neutral-700">
            <div className={`flex items-center gap-2`}>
                {Icon ? (
                    <Icon />
                ) : (
                    <div
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                )}
                <p className="capitalize">{title}</p>
            </div>
            <p className="text-[0.63rem]">{notificationCount}</p>
        </div>
    )
}

export default Emails
