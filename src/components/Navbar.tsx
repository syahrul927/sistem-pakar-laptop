import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./ThemeToggle";

const navigation = [
    { name: "Home", href: "/", current: false },
    // { name: "Article", href: "/article", current: false },
];
const Navbar = () => {
    return (
        <>
            <div className="dropdown flex justify-between md:hidden">
                <label tabIndex={0} className="btn-ghost btn md:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16"
                        />
                    </svg>
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-white p-2 shadow dark:bg-zinc-800"
                >
                    {navigation.map((item) => (
                        <li key={`nav-${item.name}`}>
                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <AuthShowcase />
            </div>
            <div className="navbar hidden bg-white dark:bg-zinc-800 md:flex">
                <div className="flex-1">
                    <ul className="menu menu-horizontal px-1">
                        {navigation.map((item) => (
                            <li key={`nav-${item.name}`}>
                                <Link href={item.href}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-none">
                    <AuthShowcase />
                </div>
            </div>
        </>
    );
};
export default Navbar;

const AuthShowcase: React.FC = () => {
    const { data: sessionData, status } = useSession();
    return status === "loading" ? (
        <div>Loading...</div>
    ) : sessionData ? (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                className="m-1 flex cursor-pointer flex-row items-center justify-center space-x-3  px-5"
            >
                <p>{sessionData.user.name}</p>
                <FontAwesomeIcon icon={faUser} />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-52 bg-white p-2 shadow dark:bg-zinc-800"
            >
                <li>
                    <div>
                        <ThemeToggle />
                    </div>
                </li>
                {sessionData.user.type.toLowerCase() === "admin" && (
                    <li>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </li>
                )}
                <li
                    onClick={() =>
                        void signOut({
                            callbackUrl: "/",
                        })
                    }
                >
                    <a>Sign out</a>
                </li>
            </ul>
        </div>
    ) : (
        <div
            className="m-1 flex cursor-pointer flex-row items-center justify-center space-x-3  px-5"
            onClick={() => void signIn()}
        >
            Sign in
        </div>
    );
};
