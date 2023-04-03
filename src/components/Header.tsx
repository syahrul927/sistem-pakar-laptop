import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Button from "./Button";
import Dropdown, { DropdownProps } from "./Dropdown";
import ThemeToggle from "./ThemeToggle";
const Header = () => {
    const router = useRouter();
    return (
        <header>
            <nav
                className="relative flex w-full items-center justify-between py-2 text-neutral-600 hover:text-neutral-700 focus:text-neutral-700 dark:text-neutral-200 md:flex-wrap md:justify-start"
                data-te-navbar-ref
            >
                <div className="flex w-full flex-wrap items-center justify-between px-6">
                    <div className="flex items-center">
                        <button
                            className="mr-2 border-0 bg-transparent py-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 dark:hover:text-white dark:focus:text-white lg:hidden"
                            type="button"
                            data-te-collapse-init
                            data-te-target="#navbarSupportedContentX"
                            aria-controls="navbarSupportedContentX"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="[&>svg]:w-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div
                        className="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto"
                        id="navbarSupportedContentX"
                        data-te-collapse-item
                    >
                        <ul
                            className="mr-auto flex w-full flex-col lg:flex-row"
                            data-te-navbar-nav-ref
                        >
                            <li data-te-nav-item-ref>
                                <a
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                                    href="#!"
                                    data-te-nav-link-ref
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Home
                                </a>
                            </li>
                            <li data-te-nav-item-ref>
                                <a
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                                    href="#!"
                                    data-te-nav-link-ref
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Article
                                </a>
                            </li>
                            <li data-te-nav-item-ref>
                                <a
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                                    href="#!"
                                    data-te-nav-link-ref
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    About
                                </a>
                            </li>
                            <li data-te-nav-item-ref>
                                <a
                                    href="/dashboard"
                                    onClick={() => {
                                        void router.prefetch("/dashboard");
                                    }}
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                                    data-te-nav-link-ref
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Login As Admin
                                </a>
                            </li>
                            <li data-te-nav-item-ref className="flex-1">
                                <AuthShowcase />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
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

    // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    //     undefined, // no input
    //     { enabled: sessionData?.user !== undefined }
    // );
    const AccountAction: DropdownProps[] = [
        {
            children: sessionData?.user.name,
        },
        {
            children: "Logout",
            action: () => void signOut(),
        },
    ];
    return status === "loading" ? (
        <div>Loading...</div>
    ) : sessionData ? (
        <div className="flex h-full flex-col items-start justify-start space-x-3 lg:flex-row lg:items-center lg:justify-end lg:pr-20">
            <Dropdown
                items={AccountAction}
                component={
                    <Image
                        width={30}
                        height={30}
                        src={
                            sessionData.user?.image ||
                            "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                        }
                        alt="image"
                        className="rounded-full"
                    />
                }
            />
            <ThemeToggle />
        </div>
    ) : (
        <div
            className="flex h-full flex-col items-start justify-start space-x-3 lg:flex-row lg:items-center lg:justify-end lg:pr-20"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
            {sessionData ? "Sign out" : "Sign in"}
        </div>
    );
};
