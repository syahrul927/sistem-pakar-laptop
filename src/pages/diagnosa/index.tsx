import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Button from "~/components/Button";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import Options from "~/components/Options";
import ProgressBar from "~/components/ProgressBar";
import ThemeToggle from "~/components/ThemeToggle";
import { QuestionProps } from "~/type";
import { api, RouterOutputs } from "~/utils/api";

type Symptom = RouterOutputs["symptom"]["getAll"];
const countPerPage = 8;
const DiagnosaPage = () => {
    const router = useRouter();

    const [result, setResult] = useState<string[]>([]);
    const [symptom, setSymptom] = useState<Symptom>([]);
    const [currentSymptom, setCurrentSymptom] = useState<QuestionProps[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);

    const { refetch, isLoading } = api.symptom.getAll.useQuery(undefined, {
        onSuccess: (data) => {
            setSymptom(data);
        },
    });

    const updatePage = (type: "inc" | "dec") => {
        if (type === "inc") {
            if (currentPage === totalPage) void router.push("/diagnosa/result");
            setCurrentPage(currentPage + 1);
            return;
        }
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };
    const updateCurrentSymptom = useCallback(
        (page: number) => {
            const startPage = page * countPerPage - countPerPage;
            let endPage = startPage + countPerPage;
            if (endPage > symptom.length) {
                endPage = symptom.length;
            }
            const curr = symptom.slice(startPage, endPage);
            setCurrentSymptom(
                curr.map(
                    (item) =>
                        ({
                            id: item.id.toString(),
                            name: item.description,
                        } as QuestionProps)
                )
            );
        },
        [symptom]
    );
    useEffect(() => {
        updateCurrentSymptom(currentPage);
    }, [currentPage, updateCurrentSymptom]);
    useEffect(() => {
        setTotalPage(Math.ceil(symptom.length / countPerPage));
    }, [symptom]);
    const onAction = useCallback((str: string[]) => setResult(str), []);
    if (isLoading) return <Loading />;
    return (
        <div className="break-word bg-white transition-colors duration-500 dark:bg-zinc-800">
            <main className="flex h-screen w-full items-start justify-center">
                <div className="flex h-full w-full flex-col px-10 pt-10">
                    <div className="w-full">
                        <ProgressBar
                            total={totalPage}
                            currentState={currentPage}
                        />
                    </div>
                    <div
                        className="mt-5 flex cursor-pointer select-none items-center space-x-2 px-2"
                        onClick={router.back}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <p className="font-semibold">Halaman Utama</p>
                    </div>
                    <div className="mt-24 flex w-full flex-col items-center justify-start">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-tight text-blue-400">
                            Gejala {currentPage}/{totalPage}
                        </p>
                        <p className="mb-10 text-center text-xl font-bold capitalize text-black dark:text-white">
                            pilih yang kamu alami!
                        </p>
                        <div className="w-full max-w-lg">
                            <Options
                                onAction={onAction}
                                type="checkbox"
                                list={currentSymptom}
                            />
                        </div>
                    </div>
                    <div className="mt-5 flex flex-1 flex-row items-start justify-center space-x-5">
                        <Button onClick={() => updatePage("dec")}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Sebelumnya
                        </Button>
                        <Button onClick={() => updatePage("inc")}>
                            Selanjutnya <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DiagnosaPage;
