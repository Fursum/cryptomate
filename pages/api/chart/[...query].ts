import Binance from "binance-api-node";
import { NextApiRequest, NextApiResponse } from "next";

const client = Binance({
  apiKey: process.env.BINANCE_API,
  apiSecret: process.env.BINANCE_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  const symbol = `${query[0]}${query[1]}`;
  const interval = query[2]

  try {
    const data = await client.candles({
      symbol: symbol,
      //@ts-ignore
      interval: interval,
      limit: interval != "1M" && interval != "1w" ? 48 : 60,
    });
    if (data) res.status(200).json(data);
  } catch(err) {res.status(404).send(err)}
};

export default handler;
