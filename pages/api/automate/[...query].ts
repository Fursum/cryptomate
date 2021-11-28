import { ActionData_T } from "../../../components/automate/AutomateTypes";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next-auth/internals/utils";
import { getSession } from "next-auth/client";

const exampleActionData: ActionData_T[] = Array(10)
  .fill({})
  .map(() => {
    const randomAction = Math.random() < 0.5 ? "buy" : "sell";
    const randomValue = Math.floor(Math.random() * 1000).toString();

    const randomData: ActionData_T = {
      actionType: randomAction,
      actionValue: randomValue,
      currencyType: "local",
    };

    return randomData;
  });

const exampleResponse = {
  actions: exampleActionData,
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    let data: ActionData_T[] = [];

    //Fetch data

    data = exampleResponse.actions;

    res.status(200).json({ actions: data, user: session });
  }

  // Not Signed in
  else res.status(401).send("Not signed in.");
};

export default handler;
