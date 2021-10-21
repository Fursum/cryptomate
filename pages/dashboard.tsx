import type { NextPage } from "next";
import Head from "next/head";

const Dashboard: NextPage = () => {
    return (
        <>
            <Head>
                <title>Cryptomate - Dashboard</title>
                <meta
                    name="description"
                    content="Dashboard of your Cryptomate"
                />
                <link rel="icon" href="/svg/raw/gear.svg" />
            </Head>
        </>
    );
};

export default Dashboard;
