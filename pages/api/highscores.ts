// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type HighScoreData = {
  name: string;
  points: number;
  rounds: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "Walter", points: 123, rounds: 2 });
  console.log(req, res);
}
