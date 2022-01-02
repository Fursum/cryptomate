import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import DashboardLayout from "@components/pageLayouts/dashboard";

const Dashboard: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && !loading) router.replace("/");
  }, [session, loading]);

  return (
    <>
      <Head>
        <title>Cryptomate - Dashboard</title>
        <meta name="description" content="Dashboard of your Cryptomate" />
        <meta name="theme-color" content="#fcd436" />
        <link rel="icon" href="/svg/raw/gear.svg" />
      </Head>

      <DashboardLayout />
    </>
  );
};

export default Dashboard;
