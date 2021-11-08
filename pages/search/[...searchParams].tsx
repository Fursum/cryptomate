import CoinDisplay from "@components/coindisplay";
import CoinData, { CoinData_T } from "@libs/coindata";
import Binance, { AvgPriceResult } from "binance-api-node";
import { NextPage, GetServerSideProps } from "next";

interface Props {
  avgPrice: AvgPriceResult;
  coinData: {
    base: CoinData_T,
    converted: CoinData_T
  }
  error: Error;
}

const Search: NextPage<Props> = ({ avgPrice, coinData, error }) => {
  const pageContent = (
    <CoinDisplay metadata={coinData} price={avgPrice.price} />
  );
  const errorContent = <div>Error: {error}</div>;

  return error ? errorContent : pageContent;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = Binance({
    apiKey: process.env.BINANCE_API,
    apiSecret: process.env.BINANCE_SECRET,
  });
  const coinData = CoinData;

  const symbol = String(ctx.params?.searchParams?.[0]).toUpperCase();
  const convertTo = String(ctx.params?.searchParams?.[1]);
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

  return {
    props: {
      avgPrice: avgPrice,
      coinData: {
        base: coinData.getCoin(symbol),
        converted: coinData.getCoin(convertTo),
      },
      error: err,
    },
  };
};

export default Search;
