import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Article } from "@prisma/client";
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
import { IArticleViewTable } from "~/type";
import { api } from "~/utils/api";

const ArticleDashboardPage: NextPage = () => {
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [, setToast] = useToastContext();
    const [selectedArticle, setSelectedArticle] = useState<Article>();
    const [dataTable, setDataTable] = useState<TableProps<IArticleViewTable>>({
        data: [],
        column: [
            {
                id: "no",
                title: "No",
            },
            {
                id: "title",
                title: "Judul Artikel",
            },
            {
                id: "date",
                title: "Tanggal dibuat",
                minSizeShow: "lg:table-cell",
            },
            {
                id: "tools",
                title: "Tools",
                minSizeShow: "md:table-cell",
            },
        ],
    });

    const { mutate: mutateDeleteArticle } = api.article.deleteById.useMutation({
        onSuccess: () => {
            void refetchGetAll();
            setToast({
                type: "SUCCESS",
                show: true,
                message: "Berhasil hapus data",
            });
        },
    });
    const onEdit = (id: Article) => {
        // TODO
        void router.push("/dashboard/article/edit/" + id.id.toString());
    };
    const onDelete = (id: Article) => {
        setModal(true);
        setSelectedArticle(id);
    };

    const { isLoading, refetch: refetchGetAll } = api.article.getAll.useQuery(
        undefined,
        {
            onSuccess: (data) => {
                const newData = data.map(
                    (item, idx) =>
                        ({
                            no: idx + 1,
                            title: (
                                <Link
                                    target={"_blank"}
                                    href={`/article/${item.id}`}
                                >
                                    <p className="max-w-sm truncate whitespace-nowrap text-blue-500 dark:text-blue-300">
                                        {item.title}
                                    </p>
                                </Link>
                            ),
                            date: item.date.toLocaleString(),
                            tools: (
                                <Tools
                                    id={item}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ),
                        } as IArticleViewTable)
                );
                const newDataTables = { ...dataTable, data: newData };
                setDataTable(newDataTables);
            },
        }
    );

    return (
        <Layout>
            <div className="flex h-screen w-full flex-col items-center space-y-2 ">
                <Content title="Halaman Artikel" className="w-full">
                    <div className="flex justify-end">
                        <Link href={"/dashboard/article/add"}>
                            <Button>
                                <FontAwesomeIcon icon={faPlus} /> Tambah Artikel
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
                                setSelectedArticle(undefined);
                            }}
                            htmlFor="my-modal"
                            className="btn-outline btn"
                        >
                            Tidak
                        </label>
                        <label
                            onClick={() => {
                                if (selectedArticle) {
                                    mutateDeleteArticle(selectedArticle.id);
                                }
                                setSelectedArticle(undefined);
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
export default ArticleDashboardPage;

const Tools: React.FC<{
    id: Article;
    onEdit: (id: Article) => void;
    onDelete: (id: Article) => void;
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
