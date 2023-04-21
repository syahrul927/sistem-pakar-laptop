import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./ThemeToggle";

const navigation = [
    { name: "Home", href: "#", current: false },
    { name: "Article", href: "#", current: false },
    { name: "About", href: "#", current: false },
];
const Header = () => {
    return (
        <header>
            <div className="dropdown md:hidden">
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
                            <a>{item.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar hidden bg-white dark:bg-zinc-800 md:flex">
                <div className="flex-1">
                    <ul className="menu menu-horizontal px-1">
                        {navigation.map((item) => (
                            <li key={`nav-${item.name}`}>
                                <a>{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-none">
                    <AuthShowcase />
                </div>
            </div>
            <section className="relative mb-6 flex h-80 items-center justify-center">
                <div className="absolute h-full w-full overflow-hidden">
                    <Image
                        className="absolute inset-0 min-h-full min-w-full object-cover opacity-30 md:-top-52"
                        src={"/pict_home.jpeg"}
                        width={400}
                        height={500}
                        alt="pict_home"
                    />
                </div>
                <div className="z-10 px-8 text-center shadow-black drop-shadow-lg">
                    <div className="mb-4 text-sm uppercase">Selamat Datang</div>
                    <div className="mb-5 font-mplus text-4xl font-medium">
                        Tempat Konsultasi{" "}
                        <span className="text-blue-500">Laptop</span> dan{" "}
                        <span className="text-blue-500">Komputer</span>
                    </div>
                    <Link href={"/diagnosa"}>
                        <Button>Mulai Diagnosa</Button>
                    </Link>
                </div>
            </section>
        </header>
    );
};
export default Header;
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
                <li onClick={() => void signOut()}>
                    <a>Sign out</a>
                </li>
            </ul>
        </div>
    ) : (
        <div onClick={() => void signIn()}>Sign in</div>
    );
};
