import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import ArticleThumbnail from "~/components/ArticleThumbnail";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Sistem Pakar Laptop</title>
                <meta name="description" content="Learning purpose" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="break-words bg-white leading-6 text-zinc-900 transition-colors duration-500 dark:bg-zinc-800 dark:text-zinc-300">
                <Header />
                <main className="flex h-screen w-full items-start justify-center">
                    <div className="grid max-w-3xl grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3">
                        <ArticleThumbnail />
                        <ArticleThumbnail />
                        <ArticleThumbnail />
                        <ArticleThumbnail />
                        <ArticleThumbnail />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
