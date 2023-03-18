import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/utils/api";
import bg from "../../public/laptop.png";
const Header = () => {
  return (
    <header>
      <nav
        className="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
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
              <li data-te-nav-item-ref className="flex-1">
                <a
                  className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="#!"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <AuthShowcase />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="relative overflow-hidden bg-blue-100 bg-no-repeat"
        style={{
          mixBlendMode: "multiply",
          backgroundPosition: "50% 90%",
          backgroundSize: "450px",
          backgroundImage: `url(${bg.src})`,
          height: "600px",
        }}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed">
          <div className="flex h-full items-start justify-center py-16">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mb-6 text-5xl font-semibold text-gray-700">
                Cari tau masalah pada laptop kamu
              </h1>
              <h3 className="mb-8 text-xl text-gray-600">
                Kita akan membantu menemukan masalah yang cocok dengan keluhan
                yang kamu alami dan akan memberikan solusi terbaik untuk masalah
                kamu
              </h3>
              <button
                type="button"
                className="inline-block rounded border-2 border-neutral-50 bg-blue-500 px-6 pt-2 pb-[6px] text-xs font-medium capitalize leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-blue-800 hover:text-neutral-200  dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Mulai Coba
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
<Header />;
export default Header;
const AuthShowcase: React.FC = () => {
  const { data: sessionData, status } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return status === "loading" ? (
    <div>Loading...</div>
  ) : sessionData ? (
    <div className="flex flex-row items-center justify-start space-x-3 lg:justify-end">
      <div>{sessionData.user.name}</div>
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
    </div>
  ) : (
    <div className="flex flex-row items-center justify-start space-x-3 lg:justify-end">
      Log in
    </div>
  );
};
