import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  res.end(`Not implemented (${process.env.NODE_ENV})`);
};
