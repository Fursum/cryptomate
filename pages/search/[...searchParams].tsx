import CoinData from "@components/coindata";
import Binance, { AvgPriceResult } from "binance-api-node";
import { NextPage, GetServerSideProps } from "next";

interface Props {
  data: AvgPriceResult;
  name: string;
  error: Error;
}

const Search: NextPage<Props> = ({ data, name, error }) => {
  const pageContent = (
    <div>
      Name: {name}
      Data: {data.price}
    </div>
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
  let data: AvgPriceResult | AvgPriceResult[] = {
    mins: 0,
    price: "0",
  };
  let err: Error | undefined = undefined;

  try {
    if (symbol)
      data = await client.avgPrice({
        symbol: symbol + convertTo,
      });
  } catch (error: any) {
    err = error.message;
  }

  return {
    props: {
      name: coinData.getCoin(symbol, "name"),
      data: data,
      error: err ? err.message : "",
    },
  };
};

export default Search;
