import asyncApolloServer from "@/apolloServer";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const apolloServer = await asyncApolloServer;
  const handler = apolloServer.createHandler({ path: "/api/graphql" });
  handler(req, res);
};

export const config = {
  api: {
    // bodyParser: false,
    externalResolver: true,
  },
};
