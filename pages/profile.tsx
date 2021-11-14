import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import SignOut from "@components/auth/signout";

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
        <link rel="icon" href="/svg/raw/gear.svg" />
      </Head>
      {session && <SignOut />}
    </>
  );
};

export default Dashboard;
