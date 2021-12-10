import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";

import Binance from "binance-api-node";
import CoinData from "@libs/coindata";

import SearchPageComponents from "@components/pageLayouts/search";

interface Props {
  coinData: {
    baseName: string;
    baseSymbol: string;
    convertedName: string;
    convertedSymbol: string;
  };
  historyData: Array<any>;
}

const Search: NextPage<Props> = ({ coinData, historyData }) => {
  const pageHead = (
    <Head>
      <>
        <title>Cryptomate - {`${coinData.baseSymbol} / ${coinData.convertedSymbol}`}</title>
        <meta name="description" content="" />
      </>
      <link rel="icon" href="/svg/raw/gear.svg" />
    </Head>
  );

  return (
    <>
      {pageHead}
      <SearchPageComponents key={`${coinData.baseSymbol}/${coinData.convertedSymbol}`} coinData={coinData} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = Binance({
    apiKey: process.env.BINANCE_API,
    apiSecret: process.env.BINANCE_SECRET,
  });
  const coinData = CoinData;

  const baseSymbol = String(ctx.params?.searchParams?.[0]).toUpperCase();
  const convertedSymbol = String(ctx.params?.searchParams?.[1].toUpperCase());
  const baseName = coinData.getCoin(baseSymbol, "name");
  const convertedName = coinData.getCoin(convertedSymbol, "name");

  return {
    props: {
      coinData: {
        baseName: baseName ? baseName : baseSymbol,
        baseSymbol: baseSymbol,
        converted: convertedName ? convertedName : convertedSymbol,
        convertedSymbol: convertedSymbol,
      },
    },
  };
};

export default Search;
