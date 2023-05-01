import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Case } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import Modal from "~/components/Modal";
import SlidePanel from "~/components/SlidePanel";
import Table, { TableProps } from "~/components/Table";
import { useToastContext } from "~/hook/ToastHooks";
import { ICaseViewTable } from "~/type";
import { RouterOutputs, api } from "~/utils/api";

type Symptom = RouterOutputs["symptom"]["getByCase"];
const CasePage: NextPage = () => {
    const router = useRouter();
    const [slide, setSlide] = useState(false);
    const [modal, setModal] = useState(false);
    const [symptom, setSymptom] = useState<Symptom>([]);
    const [, setToast] = useToastContext();
    const [selectedCase, setSelectedCase] = useState<Case>();
    const [dataTable, setDataTable] = useState<TableProps<ICaseViewTable>>({
        data: [],
        column: [
            {
                id: "no",
                title: "No",
            },
            {
                id: "problem",
                title: "Masalah",
            },
            {
                id: "solution",
                title: "Solution",
            },
            {
                id: "tools",
                title: "Tools",
            },
        ],
    });

    const onCloseSlidePanel = (val: boolean) => {
        setSlide(val);
    };

    const { isLoading: isLoadingDetail, refetch: refetchDetail } =
        api.symptom.getByCase.useQuery(
            { caseId: selectedCase?.id },
            {
                onSuccess(data) {
                    setSymptom(data);
                },
                onError(err) {
                    setToast({
                        show: true,
                        message: err.message,
                        type: "ERROR",
                    });
                },
                enabled: false,
            }
        );
    const { mutate: mutateDeleteCase } = api.case.deleteById.useMutation({
        onSuccess: () => {
            void refetchGetAll();
            setToast({
                type: "SUCCESS",
                show: true,
                message: "Berhasil hapus data",
            });
        },
    });
    const onShow = (data: Case) => {
        setSelectedCase(data);
        setSlide(true);
    };
    const onEdit = (id: Case) => {
        // TODO
        void router.push("/dashboard/case/edit/" + id.id.toString());
    };
    const onDelete = (id: Case) => {
        setModal(true);
        setSelectedCase(id);
    };

    const { isLoading, refetch: refetchGetAll } = api.case.getAll.useQuery(
        undefined,
        {
            onSuccess: (data) => {
                const newData = data.map(
                    (item, idx) =>
                        ({
                            no: idx + 1,
                            id: item.id.toString(),
                            problem: item.problem,
                            solution: item.solution,
                            className:
                                item._count.CaseSymptom > 0
                                    ? ""
                                    : "bg-red-100 dark: bg-red-950",
                            tools: (
                                <Tools
                                    id={item}
                                    onShow={onShow}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ),
                        } as ICaseViewTable)
                );
                const newDataTables = { ...dataTable, data: newData };
                setDataTable(newDataTables);
            },
        }
    );

    useEffect(() => {
        if (!slide) {
            setSymptom([]);
            setSelectedCase(undefined);
        }
    }, [slide]);
    useEffect(() => {
        if (selectedCase) {
            void refetchDetail();
        }
    }, [selectedCase, refetchDetail]);
    return (
        <Layout>
            <div className="flex h-screen w-full flex-col items-center space-y-2 ">
                <Content title="Kasus Page" className="w-full">
                    <div className="flex justify-end">
                        <Link href={"/dashboard/case/add"}>
                            <Button>
                                <FontAwesomeIcon icon={faPlus} /> Tambah Kasus
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
            <SlidePanel
                show={slide}
                onClose={onCloseSlidePanel}
                title="Detail Informasi"
            >
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-col space-y-3">
                        <div>
                            <p className="font-semibold">Masalah</p>
                            <p className="font-light text-gray-600 dark:text-gray-300">
                                {selectedCase?.problem}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">Solusi</p>
                            <p className="font-light text-gray-600 dark:text-gray-300">
                                {selectedCase?.solution}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <p className="font-semibold">Gejala Terkait</p>
                        {isLoadingDetail && <Loading />}
                        {symptom.length ? (
                            symptom.map((item) => (
                                <div
                                    key={`item-key-${item.description}`}
                                    className="flex w-full flex-row items-center space-x-5 rounded-md border p-3 "
                                >
                                    <div className="flex flex-1 flex-col ">
                                        <label className=" text-sm font-semibold">
                                            {item.description}
                                        </label>
                                        <label className="text-xs text-gray-500 dark:text-gray-400">
                                            Bobot {item.weight}
                                        </label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="font-light text-gray-600 dark:text-gray-300">
                                Tidak memiliki gejala
                            </p>
                        )}
                    </div>
                </div>
            </SlidePanel>
            <Modal
                show={modal}
                title="Perhatian!"
                message="Apakah kamu yakin ingin menghapus ini ?"
                action={
                    <>
                        <label
                            onClick={() => {
                                setSelectedCase(undefined);
                                setModal(false);
                            }}
                            htmlFor="my-modal"
                            className="btn-outline btn"
                        >
                            Tidak
                        </label>
                        <label
                            onClick={() => {
                                if (selectedCase) {
                                    mutateDeleteCase(selectedCase.id);
                                }
                                setSelectedCase(undefined);
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
export default CasePage;

const Tools: React.FC<{
    id: Case;
    onShow: (id: Case) => void;
    onEdit: (id: Case) => void;
    onDelete: (id: Case) => void;
}> = ({ id, onShow, onEdit, onDelete }) => {
    return (
        <div className="flex space-x-3">
            <Button onClick={() => onShow(id)}>Detail</Button>
            <Button onClick={() => onEdit(id)}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button onClick={() => onDelete(id)}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
    );
};
