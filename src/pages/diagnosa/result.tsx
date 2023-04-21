import Link from "next/link";
import { useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";

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
    const [array, setArray] = useState(result);
    return (
        <div className="break-word bg-white transition-colors duration-500 dark:bg-zinc-700">
            <main className="flex h-screen w-full items-center justify-center py-5">
                <Content
                    title="Hasil Diagnosa gejala yang kamu alami"
                    className="min-h-[60vh]"
                >
                    <div className="my-12 flex w-full flex-col space-y-12 rounded-md border p-5">
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
                    <div className="flex flex-col space-y-1">
                        <p className="font-semibold">
                            Gejala yang kamu pilih sebelumnya:{" "}
                        </p>
                        {symptom.map((item, idx) => (
                            <div key={`key-${item}`}>
                                <p className="text-md">
                                    {idx + 1}. {item}
                                </p>
                            </div>
                        ))}
                    </div>
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
