import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import ArticleThumbnail from "~/components/ArticleThumbnail";
import { api } from "~/utils/api";
import { useState } from "react";
import { Article } from "@prisma/client";

const Home: NextPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    api.article.getAll.useQuery(undefined, {
        onSuccess: (data) => {
            setArticles(data);
        },
    });
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
                        {articles.map((item) => (
                            <ArticleThumbnail
                                slug={item.id}
                                key={item.id}
                                title={item.title}
                                published={item.date.toLocaleDateString()}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
