import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Button from "~/components/Button";

export default function NotFoundPage() {
    const router = useRouter();
    return (
        <>
            <main className="grid min-h-screen place-items-center bg-white px-6 py-24 dark:bg-zinc-800 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-blue-600">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
                        Halaman Tidak Ditemukan
                    </h1>
                    <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                        Maaf, kita tidak dapat menemukan apa yang kamu cari 😭.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button onClick={() => router.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Kembali
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}
