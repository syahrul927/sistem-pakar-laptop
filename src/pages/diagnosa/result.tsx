import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Table, { TableProps } from "~/components/Table";
import { ISelectedSymptom } from "~/type";
import { api } from "~/utils/api";

interface MatchBar {
    problem: string;
    solution: string;
    point: number;
}
const result: MatchBar[] = [
    {
        point: 65,
        problem: "Laptop tidak bisa membaca CD/DVD",
        solution:
            "Periksa koneksi kabel data CD/DVD, periksa driver CD/DVD, ganti drive CD/DVD jika diperlukan",
    },
    {
        point: 20,
        problem: "Laptop tidak bisa membaca USB atau perangkat eksternal",
        solution:
            "Periksa koneksi USB, periksa driver USB, ganti port USB jika diperlukan, periksa perangkat eksternal",
    },
];

const symptom: string[] = [
    "Laptop tidak bisa terhubung ke jaringan Wi-Fi",
    "Laptop tidak bisa terhubung ke jaringan LAN",
    "Laptop tidak bisa mengenali perangkat Bluetooth",
];
const ResultPage: React.FC<{ results: MatchBar[] }> = ({ results }) => {
    const [dataTable, setDataTable] = useState<TableProps<ISelectedSymptom>>({
        data: symptom.map((item, index) => ({
            no: (index + 1).toString(),
            symptom: item,
        })),
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
    const [array, setArray] = useState(result);
    return (
        <div className="break-word bg-zinc-100 transition-colors duration-500 dark:bg-zinc-700">
            <main className="grid h-screen w-full  items-center justify-center gap-3 overflow-y-auto py-5 lg:grid-flow-col">
                <Content title="Hasil Kasus Diagnosa" className="h-[60vh]">
                    <div className="my-5 flex w-full flex-col space-y-12 rounded-md border p-5">
                        {array.map((item) => (
                            <div
                                key={`key-${item.problem}`}
                                className="flex flex-col space-y-1"
                            >
                                <label className="text-lg font-semibold">
                                    {item.problem}
                                </label>
                                <div className="text-sm font-light ">
                                    {item.solution}
                                </div>
                                <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
                                        style={{ width: `${item.point}%` }}
                                    >
                                        {item.point}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-auto flex">
                        <Link href={"/"}>
                            <Button>Kembali</Button>
                        </Link>
                    </div>
                </Content>
                <Content
                    className="h-[60vh]"
                    title="Gejala yang kamu pilih sebelumnya"
                >
                    <Table column={dataTable.column} data={dataTable.data} />
                </Content>
            </main>
        </div>
    );
};
export default ResultPage;
