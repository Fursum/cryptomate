import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";

import { getProviders, ClientSafeProvider, useSession } from "next-auth/client"
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthLayout from "@components/pageLayouts/auth";


interface Props{
  providers: Record<string, ClientSafeProvider> | null
}

const SignInPage: NextPage<Props> = ({providers}) => {

  const [session] = useSession();

  const router = useRouter();
  useEffect(() => {
    if (session) router.replace("/dashboard");
  }, [session]);

  return (
    <>
      <Head>
        <title>Cryptomate - Sign In</title>
        <meta
          name="description"
          content="Sign in to your account"
        />
        <meta name="theme-color" content="#fcd436" />
        <link rel="icon" href="/svg/raw/gear.svg" />
      </Head>
      <AuthLayout providers={providers}/>
    </>
  );
};


// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps:GetServerSideProps = async (context:GetServerSidePropsContext) => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default SignInPage;