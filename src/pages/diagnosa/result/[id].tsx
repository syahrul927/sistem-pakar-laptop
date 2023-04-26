import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Table, { TableProps } from "~/components/Table";
import { ISelectedSymptom } from "~/type";
import { api, RouterOutputs } from "~/utils/api";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import Navbar from "~/components/Navbar";

interface MatchBar {
    problem: string;
    solution: string;
    point: number;
}
type DetailDiagnose = RouterOutputs["diagnose"]["getDiagnose"]["case"];
const ResultPage: React.FC<{ results: MatchBar[] }> = ({ results }) => {
    const router = useRouter();
    const { id } = router.query;
    const [detail, setDetail] = useState<DetailDiagnose>();
    const [dataTable, setDataTable] = useState<TableProps<ISelectedSymptom>>({
        data: [],
        column: [
            {
                id: "no",
                title: "No",
            },
            {
                id: "symptom",
                title: "Gejala",
            },
        ],
    });
    console.log("id:", id);
    api.diagnose.getDiagnose.useQuery(String(id) || null, {
        onSuccess: (data) => {
            setDetail(data.case.sort((a, b) => b.similarity - a.similarity));
            const newData: ISelectedSymptom[] = data.symptoms.map(
                (item, index) => ({
                    no: (index + 1).toString(),
                    symptom: item.description,
                })
            );
            const newDataTable = { ...dataTable, data: [...newData] };
            setDataTable(newDataTable);
        },
    });
    return (
        <div className="break-word bg-zinc-100 transition-colors duration-500 dark:bg-zinc-700">
            <Navbar />
            <main className="flex h-screen w-full items-start justify-center overflow-y-auto py-5">
                <Content
                    title="Hasil Kasus Diagnosa"
                    className="h-auto w-[70%]"
                >
                    <div className="flex w-full  flex-col space-y-12 rounded-md border p-5">
                        {detail &&
                            detail.map((item) => (
                                <div
                                    key={`key-${item.id}`}
                                    className="flex flex-col space-y-1"
                                >
                                    <label className="text-lg font-semibold">
                                        {item.case.problem}
                                    </label>
                                    <div className="text-sm font-light ">
                                        {item.case.solution}
                                    </div>
                                    <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
                                            style={{
                                                width: `${item.similarity}%`,
                                            }}
                                        >
                                            {item.similarity}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <p className="mt-10 text-lg">Gejala yang kamu pilih</p>
                    <Table column={dataTable.column} data={dataTable.data} />
                    <div className="mt-auto flex">
                        <Link href={"/"}>
                            <Button>Kembali</Button>
                        </Link>
                    </div>
                </Content>
            </main>
        </div>
    );
};
export default ResultPage;
