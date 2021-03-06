import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import ProfileLayout from "@components/pageLayouts/profile";

const Dashboard: NextPage = () => {
  const [session] = useSession();

  const router = useRouter();
  useEffect(() => {
    if (!session) router.replace("/");
  }, [session]);

  return (
    <>
      <Head>
        <title>Cryptomate - Profile</title>
        <meta name="description" content="Change your Cryptomate profile" />
        <meta name="theme-color" content="#fcd436" />
        <link rel="icon" href="/svg/raw/gear.svg" />
      </Head>
      {session ? <ProfileLayout /> : <div className="error">You are not signed in.</div>}
    </>
  );
};

export default Dashboard;
