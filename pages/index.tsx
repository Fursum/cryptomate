import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useSession } from "node_modules/next-auth/client";
import { useEffect } from "react";

import HomeLayout from "@components/pageLayouts/home";

const Home: NextPage = () => {
  const [session] = useSession();

  const router = useRouter();
  useEffect(() => {
    if (session) router.replace("/dashboard");
  }, [session]);

  return (
    <>
      <Head>
        <title>Cryptomate</title>
        <meta
          name="description"
          content="Automate your trading with Cryptomate"
        />
        <link rel="icon" href="/svg/raw/gear.svg" />
      </Head>
      <HomeLayout />
    </>
  );
};

export default Home;
