import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from "~/components/Navbar";

const markdown =
    "# I am using __Markdown Previewer__. \n ====*====\n\nMade For FCC\n-----------\n \n### at [Codepen.io](https://codepen.io/soni7raj/full/ggmveM/)\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nUser Stories:\n\n  * I can type GitHub-flavored Markdown into a text area\n  * I can see a preview of the output of my markdown that is updated as I type\n  \n\n\n *[Rajkumar Soni](https://www.freecodecamp.com/soni7raj)*";
const ArticlePage = () => {
    const router = useRouter();
    const { id } = router.query;
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
                            <h1 className="text-2xl font-bold">{`Cara Memperbaiki Laptop yang lemot`}</h1>
                            <p className="text-sm">Published: {`02/01/2023`}</p>
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
                        <article className="prose prose-sm">
                            <ReactMarkdown>{markdown}</ReactMarkdown>
                        </article>
                    </div>
                </header>
                <main className="flex h-screen w-full items-start justify-center"></main>
            </div>
        </>
    );
};
export default ArticlePage;
