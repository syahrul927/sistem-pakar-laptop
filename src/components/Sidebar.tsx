import {
    faArchive,
    faBook,
    faDiagnoses,
    faHome,
    faKey,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import Link from "next/link";

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
        title: "Gejala",
        href: "/dashboard/gejala",
        icon: <FontAwesomeIcon icon={faKey} />,
    },
    {
        title: "Kasus",
        href: "/dashboard/kasus",
        icon: <FontAwesomeIcon icon={faArchive} />,
    },
    {
        title: "Article",
        href: "/dashboard/kasus",
        icon: <FontAwesomeIcon icon={faBook} />,
    },
    {
        title: "History Diagnosa",
        href: "/dashboard/diagnosa",
        icon: <FontAwesomeIcon icon={faDiagnoses} />,
    },
];
interface SidebarProps {
    title: string;
    href: string;
    icon: ReactNode;
}
const Sidebar = () => {
    const { data: sessionData } = useSession();
    return (
        <nav
            id="sidenav-2"
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-mode="side"
            data-te-sidenav-content="#content"
            className="fixed top-0 left-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
        >
            <div className="flex w-full flex-col space-y-2 px-6 pt-12">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 text-black dark:border-gray-300 dark:text-gray-300">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="text-sm font-light text-gray-600 dark:text-gray-300">
                    Welcome,
                </div>
                <div className="text-lg font-semibold capitalize text-gray-600 dark:text-gray-300">
                    {sessionData && sessionData.user?.name}
                </div>
            </div>
            <ul
                className="relative m-0 list-none px-[0.2rem]"
                data-te-sidenav-menu-ref
            >
                {listMenu.map((item, idx) => (
                    <li className="relative" key={`key-${idx}`}>
                        <Link
                            href={item.href}
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-4 px-6 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
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
        </nav>
    );
};
export default Sidebar;
