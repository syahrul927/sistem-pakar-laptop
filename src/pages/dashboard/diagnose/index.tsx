import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import Table, { TableProps } from "~/components/Table";
import { IHistoryViewTable } from "~/type";
import { api } from "~/utils/api";

const HistoryDiagnosePage: NextPage = () => {
    const [dataTable, setDataTable] = useState<TableProps<IHistoryViewTable>>({
        data: [],
        column: [
            {
                id: "id",
                title: "ID",
                minSizeShow: "xl:table-cell",
            },
            {
                id: "email",
                title: "Email",
            },
            {
                id: "name",
                title: "Nama",
                minSizeShow: "lg:table-cell",
            },
            {
                id: "date",
                title: "Tanggal",
                minSizeShow: "md:table-cell",
            },
            {
                id: "tools",
                title: "Tools",
                minSizeShow: "md:table-cell",
            },
        ],
    });
    const { isLoading } = api.historyDiagnose.getAll.useQuery(undefined, {
        onSuccess: (data) => {
            const array: IHistoryViewTable[] = data.map((item) => ({
                id: item.id,
                date: item.date.toLocaleString(),
                name: item.user?.name ?? "Public User",
                email: item.user?.email ?? "Public User",
                tools: (
                    <Link
                        target={"_blank"}
                        href={`/diagnosa/result/${item.id}`}
                    >
                        <Button>Detail</Button>
                    </Link>
                ),
            }));
            setDataTable({ ...dataTable, data: array });
        },
    });
    return (
        <Layout>
            <div className="flex h-screen w-full items-start justify-center">
                <Content title="History Diagnosa" className="min-w-full">
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
        </Layout>
    );
};
export default HistoryDiagnosePage;
