import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <>
      <Head>
        <title>Take it Easy</title>
        <meta name="description" content="Learning purpose" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex h-screen w-full items-center justify-center">
        <div className="min-h-[50%] min-w-[60%] max-w-lg rounded-lg bg-purple-300 p-4">
          Hello World!!
        </div>
      </main>
    </>
  );
};

export default Home;
