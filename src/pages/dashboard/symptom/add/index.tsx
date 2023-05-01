import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import { useToastContext } from "~/hook/ToastHooks";
import { api } from "~/utils/api";

const FormSymptomPage: NextPage = () => {
    const router = useRouter();

    const [description, setDescription] = useState<string>("");
    const [weight, setWeight] = useState<number>(0);

    const [, setToast] = useToastContext();

    const toastError = () => {
        setToast({
            show: true,
            message: "Tolong Lengkapi Data",
            type: "ERROR",
        });
    };
    const saveSymptom = (description: string, weight: number) => {
        if (!description || !weight) {
            toastError();
            return;
        }
        mutateSymptom({
            id: null,
            weight: weight,
            description: description,
        });
    };
    const { mutate: mutateSymptom, isLoading: isLoadingCreateSymptom } =
        api.symptom.createOrUpdate.useMutation({
            onSuccess: () => {
                setToast({
                    show: true,
                    message: "Berhasil menambahkan data Kasus",
                    type: "SUCCESS",
                });
                void router.push("/dashboard/symptom");
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

    return (
        <Layout>
            <Content title="Halaman Tambah Gejala" className="w-full">
                <div className="my-10 flex w-full justify-center">
                    <div className="flex w-full max-w-md flex-col items-center justify-start space-y-4  ">
                        <TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            title="Deskripsi"
                            required
                        />
                        <TextInput
                            value={weight.toString()}
                            type="number"
                            onChange={(e) =>
                                setWeight(parseFloat(e.target.value))
                            }
                            title="Bobot"
                            required
                        />
                        {isLoadingCreateSymptom ? (
                            <Loading />
                        ) : (
                            <div className="flex w-full justify-end">
                                <Button
                                    onClick={() =>
                                        saveSymptom(description, weight)
                                    }
                                >
                                    Save
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Content>
        </Layout>
    );
};
export default FormSymptomPage;
