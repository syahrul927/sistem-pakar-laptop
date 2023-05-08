import { NextPage } from "next";
import { useState } from "react";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
    const [totalCase, setTotalCase] = useState(0);
    const [totalSymptom, setTotalSymptom] = useState(0);
    const [totalHistory, setTotalHistory] = useState(0);
    api.summary.getSummary.useQuery(undefined, {
        onSuccess: (data) => {
            setTotalCase(data.totalCase);
            setTotalSymptom(data.totalSymptom);
            setTotalHistory(data.totalHistory);
        },
    });
    return (
        <>
            <Layout>
                <div className="grid w-full grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3">
                    <Content title="Total History Diagnosa" className="">
                        <p className="text-center text-4xl font-bold">
                            {totalHistory}
                        </p>
                    </Content>
                    <Content title="Total Kasus" className="">
                        <p className="text-center text-4xl font-bold">
                            {totalCase}
                        </p>
                    </Content>
                    <Content title="Total Gejala" className="">
                        <p className="text-center text-4xl font-bold">
                            {totalSymptom}
                        </p>
                    </Content>
                </div>
            </Layout>
        </>
    );
};

export default Dashboard;
