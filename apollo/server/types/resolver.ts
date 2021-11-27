import { IResolvers } from "@graphql-tools/utils";
import SeriesAPI from "@/datasources/series";
import { DataSources } from "apollo-server-core/src/graphqlOptions";
import { ContextBase } from "./datasources";

/** The data source for a resolver */
export interface ResolverDatasource extends DataSources<ContextBase> {
  seriesAPI: SeriesAPI;
}

/** The parent nodes of a resolver */
export type ResolverParent = null;

/** The context of a resolver */
export interface ResolverContext extends ContextBase {
  /** The data source for a resolver */
  dataSources: ResolverDatasource;
}

/** The type of a collection of resolvers */
export type Resolvers = IResolvers<ResolverParent, ResolverContext>;
