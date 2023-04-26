import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import MultipleSelect from "~/components/MultipleSelect";
import SlidePanel from "~/components/SlidePanel";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import { useToastContext } from "~/hook/ToastHooks";
import { api, RouterOutputs } from "~/utils/api";

type Symptom = RouterOutputs["symptom"]["getAll"];

const AddCasePage: NextPage = () => {
    const [problem, setProblem] = useState<string>("");
    const [descSympt, setDescSympt] = useState<string>();
    const [weightSympt, setWeightSympt] = useState<number>();
    const [solution, setSolution] = useState<string>("");
    const [symptoms, setSymptoms] = useState<Symptom>([]);
    const [selectedSymp, setSelectedSymp] = useState<number[]>([]);
    const [slide, setSlide] = useState<boolean>(false);

    const [, setToast] = useToastContext();
    const router = useRouter();

    const saveSymptom = () => {
        if (!descSympt || !weightSympt) {
            toastError();
            return;
        }
        mutateSympt({ weight: weightSympt, description: descSympt });
    };
    const toastError = () => {
        setToast({
            show: true,
            message: "Tolong Lengkapi Data",
            type: "ERROR",
        });
    };
    const saveCase = (
        problem: string,
        solution: string,
        selectedSymp: number[]
    ) => {
        if (!problem || !solution) {
            toastError();
            return;
        }
        mutateCase({
            id: null,
            solution: solution,
            problem: problem,
            symptom: [...selectedSymp],
        });
    };
    const onChangeSymptom = useCallback(
        (id: number) => {
            if (selectedSymp.includes(id)) {
                setSelectedSymp(selectedSymp.filter((item) => item !== id));
                return;
            }
            setSelectedSymp([...selectedSymp, id]);
        },
        [selectedSymp]
    );
    const { refetch: refetchSymptom, isLoading: isLoadingSymptom } =
        api.symptom.getAll.useQuery(undefined, {
            onSuccess: (data) => {
                setSymptoms(data);
            },
        });
    const { mutate: mutateSympt, isLoading: isLoadingCreateSympt } =
        api.symptom.create.useMutation({
            onSuccess: () => {
                setToast({
                    show: true,
                    message: "Berhasil menambahkan data Gejala",
                    type: "SUCCESS",
                });
                void refetchSymptom();
                setSlide(false);
            },
            onError: (err) => {
                const message = err.message;
                setToast({
                    show: true,
                    message: message,
                    type: "ERROR",
                });
            },
        });
    const { mutate: mutateCase, isLoading: isLoadingCreateCase } =
        api.case.createOrUpdate.useMutation({
            onSuccess: () => {
                setToast({
                    show: true,
                    message: "Berhasil menambahkan data Kasus",
                    type: "SUCCESS",
                });
                void router.push("/dashboard/case");
            },
            onError: (err) => {
                const message = err.message;
                setToast({
                    show: true,
                    message: message,
                    type: "ERROR",
                });
            },
        });

    useEffect(() => {
        if (!slide) {
            setWeightSympt(undefined);
            setDescSympt("");
        }
    }, [slide]);

    return (
        <Layout>
            <Content title="Halaman Tambah Kasus" className="w-full">
                <div className="my-10 flex w-full justify-center">
                    <div className="flex w-full max-w-md flex-col items-center justify-start space-y-4  ">
                        <TextArea
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            title="Masalah"
                            required
                        />
                        <TextArea
                            value={solution}
                            onChange={(e) => setSolution(e.target.value)}
                            title="Solusi"
                            required
                        />
                        {isLoadingSymptom ? (
                            <Loading />
                        ) : (
                            <MultipleSelect
                                data={symptoms.map((item) => ({
                                    id: item.id,
                                    description: item.description,
                                    weight: item.weight,
                                }))}
                                onChange={onChangeSymptom}
                            />
                        )}
                        <div className="flex w-full">
                            <Button onClick={() => setSlide(true)}>
                                Buat Gejala Baru{" "}
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </div>
                        {isLoadingCreateCase ? (
                            <Loading />
                        ) : (
                            <div className="flex w-full justify-end">
                                <Button
                                    onClick={() =>
                                        saveCase(
                                            problem,
                                            solution,
                                            selectedSymp
                                        )
                                    }
                                >
                                    Save
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Content>
            <SlidePanel
                title="Tambah Gejala Baru"
                show={slide}
                onClose={(val) => setSlide(val)}
            >
                <TextInput
                    value={descSympt}
                    onChange={(e) => setDescSympt(e.target.value)}
                    title="Deskripsi Gejala"
                    required
                />
                <TextInput
                    value={weightSympt}
                    type="number"
                    onChange={(e) => setWeightSympt(parseFloat(e.target.value))}
                    title="Bobot Gejala"
                    required
                />
                {isLoadingCreateSympt ? (
                    <Loading />
                ) : (
                    <div className="flex w-full">
                        <Button onClick={saveSymptom}>Save</Button>
                    </div>
                )}
            </SlidePanel>
        </Layout>
    );
};
export default AddCasePage;
