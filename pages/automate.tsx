import Automate from "@components/automate/";
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

interface Props {
  actionLimit: number;
}

const Dashboard: NextPage<Props> = ({actionLimit}) => {
  return (
    <>
      <Head>
        <title>Cryptomate - Automate</title>
        <meta name="description" content="Setup your automation" />
        <link rel="icon" href="/svg/raw/gear.svg" />
      </Head>
      <div className="automate-layout">
        <Automate actionLimit={actionLimit} />
      </div>
      
    </>
  );
};

export const getServerSideProps:GetServerSideProps = async (ctx:GetServerSidePropsContext) => {
  return {
    props: {
      actionLimit: 5
    }
  };
};

export default Dashboard;
