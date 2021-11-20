import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
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
import { ContextBase } from "./types/datasources";
import { ResolverDatasource } from "./types/resolver";

/**
 * Sets up any dataSources our resolvers need
 * @returns a datasource object
 * @internal
 */
const dataSources = (): ResolverDatasource => {
  return {};
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
const baseTypeDefs = `
  type Mutation {
    dummy: String
  }
  type Query {
    dummy: String
  }
`;

/**
 * A micro Apollo server that would resolve any graphql queries
 */
const apolloServer = new ApolloServer({
  typeDefs: [baseTypeDefs, DateTypeDefinition, DateTimeTypeDefinition],
  resolvers: [{ Date: DateResolver, DateTime: DateTimeResolver }],
  dataSources,
  context,
  plugins: [
    process.env.GRAPHQL_PLAYGROUND === "enabled"
      ? ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            "request.credentials": "same-origin",
          },
        })
      : ApolloServerPluginLandingPageDisabled(),
  ],
});

export default new Promise<ApolloServer>((resolve) => {
  apolloServer.start().then(() => resolve(apolloServer));
});
