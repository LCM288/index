import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { IncomingMessage } from "http";
import { getUserFromRequest } from "utils/auth";

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
 * The function that sets up the global context for each resolver, using the req
 * @internal
 */
const context = async ({
  req,
}: {
  req: IncomingMessage;
}): Promise<ContextBase> => {
  const user = await getUserFromRequest(req);
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
export default new Promise<ApolloServer>(async (resolve) => {
  const store = await firestore;
  const dataSources = (): ResolverDatasource => ({
    seriesAPI: new SeriesAPI(store.collection("series")),
  });
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
  apolloServer.start().then(() => resolve(apolloServer));
});
