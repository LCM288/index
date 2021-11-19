import * as apolloServerMicro from "apollo-server-micro";
import { gql } from "apollo-server";
import { IncomingMessage } from "http";
import { getUser } from "utils/auth";

// models

// resolvers
import {
  DateResolver,
  DateTypeDefinition,
  DateTimeResolver,
  DateTimeTypeDefinition,
} from "graphql-scalars";

// datasources

// others
import {
  sequelize,
  personStore,
  executiveStore,
  socSettingStore,
  logEntryStore,
} from "@/store";
import { ContextBase } from "./types/datasources";
import { ResolverDatasource } from "./types/resolver";

/**
 * Sets up any dataSources our resolvers need
 * @returns a datasource object
 * @internal
 */
const dataSources = (): ResolverDatasource => {
  return {
  };
};

/**
 * The function that sets up the global context for each resolver, using the req
 * @internal
 */
const context = async ({
  req,
}: {
  req: IncomingMessage;
}): Promise<ContextBase> => {
  const user = await getUser(req);
  return { user };
};

/**
 * A base type def for graphql
 * @internal
 */
const baseTypeDefs = gql`
  type Mutation
  type Query
  ${DateTypeDefinition}
  ${DateTimeTypeDefinition}
`;

/**
 * A micro Apollo server that would resolve any graphql queries
 */
const apolloServer = new apolloServerMicro.ApolloServer({
  typeDefs: [
    baseTypeDefs,
  ],
  resolvers: [
    { Date: DateResolver, DateTime: DateTimeResolver },
  ],
  dataSources,
  context,
  playground: {
    settings: {
      "request.credentials": "same-origin",
    },
  },
});

export default apolloServer;
