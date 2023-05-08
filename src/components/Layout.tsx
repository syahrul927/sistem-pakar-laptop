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
            <div className="break-word overflow-hidden bg-zinc-100 transition-colors duration-500 dark:border-zinc-900 dark:bg-zinc-700">
                <div className="flex flex-row overflow-hidden">
                    <Sidebar />
                    <div className="mt-5 flex h-screen w-full flex-1 flex-col items-center overflow-y-auto px-3 py-5 lg:mt-0 ">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Layout;
