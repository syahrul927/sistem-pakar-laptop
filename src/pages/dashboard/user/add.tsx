import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import TextInput from "~/components/TextInput";
import { useToastContext } from "~/hook/ToastHooks";
import { api } from "~/utils/api";

const AddUserPage: NextPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cPass, setCPass] = useState("");
    const [errPass, setErrPass] = useState("");
    const [, setToast] = useToastContext();
    const router = useRouter();

    useEffect(() => {
        if (password) {
            if (password !== cPass) {
                setErrPass("Password Tidak Sama");
            } else {
                setErrPass("");
            }
        }
    }, [password, cPass]);

    const { mutate, isLoading: isLoadingCreate } = api.user.create.useMutation({
        onSuccess: () => {
            setToast({
                show: true,
                message: "Berhasil menambahkan data user",
                type: "SUCCESS",
            });
            void router.push("/dashboard/user");
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
            <Content title="Halaman Tambah User" className="w-full">
                <div className="my-10 flex w-full justify-center">
                    <div className="flex w-full max-w-md flex-col items-center justify-start space-y-4  ">
                        <TextInput
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            title="Nama"
                            required
                        />
                        <TextInput
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            title="Email"
                            required
                        />
                        <TextInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            title="Password"
                            type="password"
                            required
                        />
                        <TextInput
                            value={cPass}
                            errorMessage={errPass}
                            onChange={(e) => setCPass(e.target.value)}
                            title="Confirm Password"
                            type="password"
                            required
                        />
                        <div className="flex w-full justify-end">
                            {isLoadingCreate ? (
                                <Loading />
                            ) : (
                                <Button
                                    onClick={() =>
                                        mutate({ email, name, password })
                                    }
                                >
                                    Save
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};
export default AddUserPage;
