import {
    faArchive,
    faArrowCircleLeft,
    faBars,
    faBook,
    faDiagnoses,
    faHome,
    faKey,
    faSignOut,
    faUser,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const listMenu: SidebarProps[] = [
    {
        title: "Home",
        href: "/dashboard/",
        icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
        title: "User",
        href: "/dashboard/user",
        icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
        title: "Kasus",
        href: "/dashboard/case",
        icon: <FontAwesomeIcon icon={faArchive} />,
    },
    {
        title: "Gejala",
        href: "/dashboard/symptom",
        icon: <FontAwesomeIcon icon={faKey} />,
    },
    {
        title: "Article",
        href: "/dashboard/article",
        icon: <FontAwesomeIcon icon={faBook} />,
    },
    {
        title: "History Diagnosa",
        href: "/dashboard/diagnose",
        icon: <FontAwesomeIcon icon={faDiagnoses} />,
    },
    {
        title: "Halaman Utama",
        href: "/",
        icon: <FontAwesomeIcon icon={faArrowCircleLeft} />,
    },
    {
        title: "Logout",
        href: () =>
            void signOut({
                callbackUrl: "/",
            }),
        icon: <FontAwesomeIcon icon={faSignOut} />,
    },
];
interface SidebarProps {
    title: string;
    href: string | (() => void);
    icon: ReactNode;
}
const Sidebar = () => {
    const { data: sessionData } = useSession();
    const [show, setShow] = useState(false);
    return (
        <div className={`drawer mb-5 max-w-fit bg-white dark:bg-zinc-800`}>
            <div className="drawer-mobile drawer">
                <div
                    className="absolute left-0 top-0 z-50 w-full rounded-sm bg-white p-2 dark:bg-zinc-800 lg:hidden"
                    onClick={() => {
                        setShow(!show);
                    }}
                >
                    <FontAwesomeIcon icon={show ? faX : faBars} />
                </div>
                <div
                    className={`drawer-side bg-white transition-all duration-300 dark:bg-zinc-800 ${
                        show ? "!absolute z-40 h-full" : "!hidden"
                    } lg:!block `}
                >
                    <div className="flex flex-col space-y-2 px-6 pt-12">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 text-black dark:border-gray-300 dark:text-gray-300">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="text-sm font-light text-gray-600 dark:text-gray-300">
                            Welcome,
                        </div>
                        <div className="text-lg font-semibold capitalize text-gray-600 dark:text-gray-300">
                            {sessionData && sessionData.user?.name}
                        </div>
                        <div>
                            <ThemeToggle />
                        </div>
                    </div>
                    <ul className="menu w-[80%] p-4 text-base-content lg:w-64">
                        {listMenu.map((item, idx) => (
                            <li key={`key-${idx}`}>
                                <Link
                                    href={
                                        typeof item.href === "string"
                                            ? item.href
                                            : "#"
                                    }
                                    onClick={
                                        typeof item.href === "function"
                                            ? item.href
                                            : undefined
                                    }
                                    className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                    data-te-sidenav-link-ref
                                >
                                    <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                                        {item.icon}
                                    </span>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
