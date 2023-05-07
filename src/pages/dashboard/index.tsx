import { NextPage } from "next";
import Content from "~/components/Content";
import Layout from "~/components/Layout";

const Dashboard: NextPage = () => {
    const callback = (str: string) => {
        console.log(str);
    };
    callback("str");
    return (
        <>
            <Layout>
                <div className=" flex h-screen w-full items-start justify-center">
                    <Content title="Dashboard Page" className="">
                        Tempat menampilkan Dashboard
                    </Content>
                </div>
            </Layout>
        </>
    );
};

export default Dashboard;
