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

/** The type of a resolver
 * @param Args - The type of the arguments for the resolver
 * @param Result - The return type of the resolver
 */
export type ResolverFn<Args, Result> = (
  parent: ResolverParent,
  args: Args,
  context: ResolverContext
) => Result | Promise<Result>;

/** The type of a collection of resolvers */
export type Resolvers = IResolvers<ResolverParent, ResolverContext>;
