import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import TextCodeMirror from "~/components/TextCodeMirror";
import TextInput from "~/components/TextInput";
import { useToastContext } from "~/hook/ToastHooks";
import { api } from "~/utils/api";

const FormArticlePage: NextPage = () => {
    const router = useRouter();

    const [body, setBody] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const [, setToast] = useToastContext();

    const toastError = () => {
        setToast({
            show: true,
            message: "Tolong Lengkapi Data",
            type: "ERROR",
        });
    };
    const saveArticle = (body: string, title: string) => {
        if (!body || !title) {
            toastError();
            return;
        }
        mutateArticle({
            id: null,
            title: title,
            body: body,
        });
    };
    const { mutate: mutateArticle, isLoading: isLoadingCreateArticle } =
        api.article.createOrUpdate.useMutation({
            onSuccess: () => {
                setToast({
                    show: true,
                    message: "Berhasil menambahkan data Kasus",
                    type: "SUCCESS",
                });
                void router.push("/dashboard/article");
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
                        <TextInput
                            value={title}
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            title="Judul Artikel"
                            required
                        />
                        <TextCodeMirror
                            value={body}
                            onChange={(e) => setBody(e)}
                            title="Deskripsi"
                            required
                        />
                        {isLoadingCreateArticle ? (
                            <Loading />
                        ) : (
                            <div className="flex w-full justify-end">
                                <Button
                                    onClick={() => saveArticle(body, title)}
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
export default FormArticlePage;
