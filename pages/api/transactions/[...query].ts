import { NextApiRequest } from "next";
import { NextApiResponse } from "next-auth/internals/utils";
import { getSession } from "next-auth/client";

const exampleResponse = {
  transactions: [
    { action: "buy", amount: "420" , value: "500"},
    { action: "sell", amount: "48" , value: "500"},
    { action: "buy", amount: "420" , value: "500"},
    { action: "buy", amount: "52" , value: "500"},
    { action: "sell", amount: "420" , value: "500"},
    { action: "buy", amount: "4" , value: "500"},
    { action: "buy", amount: "500" , value: "500"},
    { action: "sell", amount: "420" , value: "500"},
  ],
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    let data: typeof exampleResponse.transactions = [];

    //Fetch data

    data = exampleResponse.transactions;

    res.status(200).json({ history: data, user: session });
  }

  // Not Signed in
  else res.status(401).send("Not signed in.");
};

export default handler;
