import { NextApiRequest } from "next";
import { NextApiResponse } from "next-auth/internals/utils";
import { getSession } from "next-auth/client";

import randomID  from '@libs/functions/randomID';
import { Strategy_T } from "@components/automate/AutomateTypes";

const exampleData: Strategy_T[] = Array(20)
  .fill({})
  .map(() => {
    const randomValue = Math.floor(Math.random() * 1000).toString();

    const randomData: Strategy_T = {
      id: randomID(),
      creationDate: new Date(Date.now()),
      lastUpdate: new Date(Date.now()),
      orderList: [],
      title: "Test title: " + randomValue,
      totalBuyCap: 0
    };

    return randomData;
  });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    let data: Strategy_T[] = [];

    //Fetch data

    data = exampleData;

    res.status(200).json({ list: data, user: session });
  }

  // Not Signed in
  else res.status(401).send("Not signed in.");
};

export default handler;
