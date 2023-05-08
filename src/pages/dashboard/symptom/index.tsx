import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Symptom } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import Modal from "~/components/Modal";
import Table, { TableProps } from "~/components/Table";
import { useToastContext } from "~/hook/ToastHooks";
import { ISymptomViewTable } from "~/type";
import { api } from "~/utils/api";

const SymptomPage: NextPage = () => {
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [, setToast] = useToastContext();
    const [selectedSymptom, setSelectedSymptom] = useState<Symptom>();
    const [dataTable, setDataTable] = useState<TableProps<ISymptomViewTable>>({
        data: [],
        column: [
            {
                id: "no",
                title: "No",
            },
            {
                id: "description",
                title: "Deskripsi Gejala",
            },
            {
                id: "weight",
                title: "Bobot",
                minSizeShow: "lg",
            },
            {
                id: "tools",
                title: "Tools",
                minSizeShow: "md",
            },
        ],
    });

    const { mutate: mutateDeleteSymptom } = api.symptom.deleteById.useMutation({
        onSuccess: () => {
            void refetchGetAll();
            setToast({
                type: "SUCCESS",
                show: true,
                message: "Berhasil hapus data",
            });
        },
    });
    const onEdit = (id: Symptom) => {
        // TODO
        void router.push("/dashboard/symptom/edit/" + id.id.toString());
    };
    const onDelete = (id: Symptom) => {
        setModal(true);
        setSelectedSymptom(id);
    };

    const { isLoading, refetch: refetchGetAll } = api.symptom.getAll.useQuery(
        undefined,
        {
            onSuccess: (data) => {
                const newData = data.map(
                    (item, idx) =>
                        ({
                            no: idx + 1,
                            id: item.id.toString(),
                            description: item.description,
                            weight: item.weight.toString(),
                            tools: (
                                <Tools
                                    id={item}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ),
                        } as ISymptomViewTable)
                );
                const newDataTables = { ...dataTable, data: newData };
                setDataTable(newDataTables);
            },
        }
    );

    return (
        <Layout>
            <div className="flex h-screen w-full flex-col items-center space-y-2 ">
                <Content title="Halaman Gejala" className="w-full">
                    <div className="flex justify-end">
                        <Link href={"/dashboard/symptom/add"}>
                            <Button>
                                <FontAwesomeIcon icon={faPlus} /> Tambah Gejala
                            </Button>
                        </Link>
                    </div>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <Table
                            column={dataTable.column}
                            data={dataTable.data}
                        />
                    )}
                </Content>
            </div>
            <Modal
                show={modal}
                title="Perhatian!"
                message="Apakah kamu yakin ingin menghapus ini ?"
                action={
                    <>
                        <label
                            onClick={() => {
                                setModal(false);
                                setSelectedSymptom(undefined);
                            }}
                            htmlFor="my-modal"
                            className="btn-outline btn"
                        >
                            Tidak
                        </label>
                        <label
                            onClick={() => {
                                if (selectedSymptom) {
                                    mutateDeleteSymptom(selectedSymptom.id);
                                }
                                setSelectedSymptom(undefined);
                                setModal(false);
                            }}
                            htmlFor="my-modal"
                            className="btn-error btn"
                        >
                            Ya
                        </label>
                    </>
                }
            />
        </Layout>
    );
};
export default SymptomPage;

const Tools: React.FC<{
    id: Symptom;
    onEdit: (id: Symptom) => void;
    onDelete: (id: Symptom) => void;
}> = ({ id, onEdit, onDelete }) => {
    return (
        <div className="flex space-x-3">
            <Button onClick={() => onEdit(id)}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button onClick={() => onDelete(id)}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
    );
};
