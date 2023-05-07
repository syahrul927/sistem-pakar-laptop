import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const ArticlePage = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>("Title Default");
    const [date, setDate] = useState<string>("");
    const [body, setBody] = useState<string>("Body Default");
    const { id } = router.query;
    api.article.getById.useQuery(String(id) || null, {
        onSuccess: (data) => {
            setTitle(data?.title || "");
            setBody(data?.body || "");
            setDate(data?.date.toLocaleDateString() || "");
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
                <header className="flex flex-col items-center">
                    <Navbar />
                    <div className="w-full max-w-2xl">
                        <div className="my-10">
                            <h1 className="text-2xl font-bold">{title}</h1>
                            <p className="text-sm">Published: {date}</p>
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
                                <div className="mb-5 font-mplus text-4xl font-medium"></div>
                            </div>
                        </section>
                        <article className="prose-md prose prose-blue  dark:prose-invert">
                            <ReactMarkdown>{body}</ReactMarkdown>
                        </article>
                    </div>
                </header>
                <main className="flex h-screen w-full items-start justify-center"></main>
            </div>
        </>
    );
};
export default ArticlePage;
