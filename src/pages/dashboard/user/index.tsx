import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Button from "~/components/Button";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import Table, { TableProps } from "~/components/Table";
import { IUserViewTable } from "~/type";
import { api } from "~/utils/api";

const UserPage: NextPage = () => {
    const [dataTable, setDataTable] = useState<TableProps<IUserViewTable>>({
        data: [],
        column: [
            {
                id: "id",
                title: "ID",
            },
            {
                id: "nama",
                title: "Nama",
            },
            {
                id: "email",
                title: "Email",
            },
            {
                id: "type",
                title: "Tipe User",
            },
        ],
    });
    const { isLoading } = api.user.getAll.useQuery(undefined, {
        onSuccess: (data) => {
            const newData = data.map(
                (item) =>
                    ({
                        id: item.id,
                        nama: item.name,
                        email: item.email,
                        type: item.type.toUpperCase(),
                    } as IUserViewTable)
            );
            const newDataTables = { ...dataTable, data: newData };
            setDataTable(newDataTables);
        },
    });

    return (
        <Layout>
            <div className="flex h-screen w-full items-start justify-center">
                <Content title="User Page" className="min-w-full">
                    <div className="flex justify-end">
                        <Link href={"/dashboard/user/add"}>
                            <Button>
                                <FontAwesomeIcon icon={faPlus} /> Tambah User
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
        </Layout>
    );
};
export default UserPage;
