import { type NextPage } from "next";
import Head from "next/head";
import Drawer from "~/components/Drawer";
import Content from "~/components/Content";
import DrawerEnd from "~/components/DrawerEnd";
import Button from "~/components/Button";
import Dropdown, { type DropdownProps } from "~/components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileEdit, faGear, faStar } from "@fortawesome/free-solid-svg-icons";
import TextInput from "~/components/TextInput";
import Table, { TableProps } from "~/components/Table";
import { ICustomerView } from "~/type";

const ActionMenu: DropdownProps[] = [
    {
        children: (
            <div>
                <FontAwesomeIcon icon={faFileEdit} /> &nbsp; Edit location
                details
            </div>
        ),
    },
    {
        children: (
            <div>
                <FontAwesomeIcon icon={faGear} /> &nbsp; Edit location settings
            </div>
        ),
    },
    {
        children: (
            <div>
                <FontAwesomeIcon icon={faStar} /> &nbsp; Set location as default
            </div>
        ),
    },
];

const dataCustomer: TableProps<ICustomerView> = {
    data: [
        {
            id: "S001",
            nama: "Syahrul Ataufik",
            phone: "089900929292",
            email: "syahrul@gmail.com",
        },
        {
            id: "S002",
            nama: "Tegar Machfudzi",
            phone: "08133282827",
            email: "tegar@gmail.com",
        },
        {
            id: "S003",
            nama: "Renaldi Dwi Iwan",
            phone: "08133282827",
            email: "aldi@gmail.com",
        },
        {
            id: "S004",
            nama: "Nauval Purnomo Sidi",
            phone: "0812923938",
            email: "nopal@gmail.com",
        },
        {
            id: "S005",
            nama: "Ferry Agung",
            phone: "08133280202",
            email: "ferry@gmail.com",
        },
        {
            id: "S006",
            nama: "Popol dan Kupa",
            phone: "0818372928",
            email: "popoldankupaselamanya@gmail.com",
        },
        {
            id: "S007",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S008",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S009",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S010",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S011",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S012",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S013",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S014",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S015",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S016",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S017",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S018",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S019",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S020",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S021",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S022",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S023",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S024",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S025",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S026",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S027",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S028",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S029",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S030",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S031",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S032",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S033",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S034",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S035",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S036",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S037",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S038",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S039",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S040",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S041",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
        {
            id: "S042",
            nama: "Gusion",
            phone: "082192928382",
            email: "gusion@gmail.com",
        },
    ],
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
            id: "phone",
            title: "Phone",
        },
        {
            id: "email",
            title: "Email",
        },
    ],
};
const Dashboard: NextPage = () => {
    return (
        <>
            <Head>
                <title>Warehouse App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="relative flex h-screen min-h-full items-start justify-center overflow-y-auto border bg-gray-100 transition-colors duration-500 dark:border-zinc-900 dark:bg-zinc-700">
                <Drawer />
                <DrawerEnd />
                <div
                    className="flex w-full flex-col items-center space-y-3 p-5 !pl-[260px] "
                    id="content"
                >
                    <Content title="Must be static" className="">
                        <Dropdown items={ActionMenu} />
                        <Button
                            data-te-sidenav-toggle-ref
                            data-te-target="#sidenav-2"
                            aria-controls="#sidenav-2"
                            aria-haspopup="true"
                        >
                            Sidebar
                        </Button>
                        <Button
                            data-te-sidenav-toggle-ref
                            data-te-target="#sideEditor"
                            aria-controls="#sideEditor"
                            aria-haspopup="true"
                        >
                            Editor
                        </Button>
                    </Content>
                    <Content title="Joki Priceless" className="max-w-lg">
                        <div className="text-sm font-light">
                            Blog ini adalah sumber informasi dan layanan untuk
                            pembuatan program aplikasi terjangkau dengan
                            kualitas terbaik untuk skripsi Anda. Kami
                            berkomitmen untuk memberikan solusi terbaik dalam
                            pengembangan aplikasi skripsi yang terjangkau namun
                            tetap berkualitas, dengan mengutamakan kepuasan
                            pelanggan.
                        </div>
                        <TextInput placeholder="Retail Name" />
                        <TextInput placeholder="Username" title="Username" />
                        <TextInput
                            placeholder="Password"
                            type={"password"}
                            title="Password"
                            required
                        />
                    </Content>
                    <Content title={"Data Customer"} className="min-w-full">
                        <Table
                            column={dataCustomer.column}
                            data={dataCustomer.data}
                        />
                    </Content>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
