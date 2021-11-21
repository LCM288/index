import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { IncomingMessage } from "http";
import { getUser } from "utils/auth";

// models
import { typeDefs as seriesTypeDefs } from "@/models/series";

// resolvers
import {
  DateResolver,
  DateTypeDefinition,
  DateTimeResolver,
  DateTimeTypeDefinition,
} from "graphql-scalars";
import {
  resolvers as seriesResolvers,
  resolverTypeDefs as seriesResolverTypeDefs,
} from "@/resolvers/series";

// datasources
import SeriesAPI from "./datasources/series";
import { firestore } from "./store";

// others
import { ContextBase } from "./types/datasources";
import { ResolverDatasource } from "./types/resolver";

/**
 * Sets up any dataSources our resolvers need
 * @returns a datasource object
 * @internal
 */
const dataSources = (): ResolverDatasource => {
  return {
    seriesAPI: new SeriesAPI(firestore.collection("series")),
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
const baseTypeDefs = `
  type Mutation
  type Query
`;

/**
 * A micro Apollo server that would resolve any graphql queries
 */
const apolloServer = new ApolloServer({
  introspection: process.env.GRAPHQL_PLAYGROUND === "enabled",
  typeDefs: [
    baseTypeDefs,
    seriesTypeDefs,
    seriesResolverTypeDefs,
    DateTypeDefinition,
    DateTimeTypeDefinition,
  ],
  resolvers: [
    { Date: DateResolver, DateTime: DateTimeResolver },
    seriesResolvers,
  ],
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
