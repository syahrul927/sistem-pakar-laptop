import Head from "next/head";
import Sidebar from "./Sidebar";

const Layout: React.FC<React.ComponentPropsWithoutRef<"div">> = (props) => {
    return (
        <>
            <Head>
                <title>Halaman Dashboard</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="break-word bg-zinc-100 transition-colors duration-500  dark:border-zinc-900 dark:bg-zinc-700">
                <Sidebar />
                <div
                    className="flex h-screen w-full flex-col items-center space-y-3 p-5 !pl-[260px] "
                    id="content"
                >
                    {props.children}
                </div>
            </div>
        </>
    );
};
export default Layout;
