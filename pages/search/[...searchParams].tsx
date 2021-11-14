import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import CoinDisplay from "@components/coindisplay";
import CoinData, { CoinData_T } from "@libs/coindata";
import Binance, { AvgPriceResult } from "binance-api-node";

interface Props {
  avgPrice: AvgPriceResult;
  coinData: {
    base: CoinData_T;
    converted: CoinData_T;
  };
  error: Error;
}

const Search: NextPage<Props> = ({ avgPrice, coinData, error }) => {
  const successHead = (
    <Head>
      <title>Cryptomate - {`${coinData.base} / ${coinData.converted}`}</title>
      <meta name="description" content="Automate your cryptos" />
      <link rel="icon" href="/svg/raw/gear.svg" />
    </Head>
  );
  const errorHead = (
    <Head>
      <title>Cryptomate - Page Not Found</title>
      <meta name="description" content="This page does not exist!" />
      <link rel="icon" href="/svg/raw/gear.svg" />
    </Head>
  );
  const pageContent = (
    <>
      {successHead}
      <CoinDisplay metadata={coinData} price={avgPrice.price} />
    </>
  );
  const errorContent = (
    <>
      {errorHead}
      <div className={"error"}>Error: {error}</div>
    </>
  );

  return error ? errorContent : pageContent;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = Binance({
    apiKey: process.env.BINANCE_API,
    apiSecret: process.env.BINANCE_SECRET,
  });
  const coinData = CoinData;

  const symbol = String(ctx.params?.searchParams?.[0]).toUpperCase();
  const convertTo = String(ctx.params?.searchParams?.[1].toUpperCase());
  let avgPrice: AvgPriceResult | AvgPriceResult[] = {
    mins: 0,
    price: "0",
  };
  let err: string = "";

  try {
    if (symbol)
      avgPrice = await client.avgPrice({
        symbol: (symbol + convertTo).toUpperCase(),
      });
  } catch (error: any) {
    err = error.message;
  }

  const base = coinData.getCoin(symbol, "name");
  const converted = coinData.getCoin(convertTo, "name");

  return {
    props: {
      avgPrice: avgPrice,
      coinData: {
        base: base ? base : symbol,
        converted: converted ? converted : convertTo,
      },
      error: err,
    },
  };
};

export default Search;
