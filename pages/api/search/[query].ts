import { MeiliSearch } from "meilisearch";
import type { NextApiRequest, NextApiResponse } from "next";

const searchClient = new MeiliSearch({
  host: "ec2-35-158-205-212.eu-central-1.compute.amazonaws.com",
  apiKey: process.env.MEILI_PUBLIC,
});

if (!process.env.MEILI_PUBLIC)
  throw new Error(
    "MeiliSearch public key is not defined. Add MEILI_PUBLIC to your .env.local file."
  );

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;
  const data = await searchClient
    .index("exchangeInfo")
    .search(query.toString(), {
      limit: 5,
    });

  if (data) res.status(200).json({ results: data.hits });
};

export default handler;
