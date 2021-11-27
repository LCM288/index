import { Resolvers, ResolverContext } from "@/types/resolver";
import {
  QueryResolvers,
  MutationResolvers,
  SeriesUpdateResponse,
  Series,
} from "@/types/graphqlTypes.generated";

// Query resolvers

// TODO
/**
 * The resolver for seriesList Query
 * @async
 * @returns All the executives
 * @category Query Resolver
 */
const seriesListResolver: QueryResolvers<ResolverContext>["seriesList"] =
  async (_, __, { dataSources }): Promise<Series[]> => {
    const seriesList = await dataSources.seriesAPI.findSome();
    return seriesList;
  };

// Mutation resolvers

/**
 * The resolver for createSeries Query
 * @async
 * @returns All the executives
 * @category Query Resolver
 */
const createSeriesResolver: MutationResolvers<ResolverContext>["createSeries"] =
  async (_, arg, { dataSources }): Promise<SeriesUpdateResponse> => {
    try {
      const newSeries = await dataSources.seriesAPI.create(arg);
      return {
        success: true,
        message: `Series ${arg.title} is created successfully`,
        series: newSeries,
      };
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        return {
          success: false,
          message: err.message,
        };
      } else {
        return {
          success: false,
          message: "Unknown error",
        };
      }
    }
  };

/** The resolvers associated with the Series model */
export const resolvers: Resolvers = {
  Query: {
    /** see {@link seriesListResolver} */
    seriesList: seriesListResolver,
  },
  Mutation: {
    /** see {@link createSeriesResolver} */
    createSeries: createSeriesResolver,
  },
};

/**
 * The graphql schema associated with the Executive model's resolvers
 * @internal
 */
export const resolverTypeDefs = `
  extend type Query {
    seriesList: [Series!]!
  }

  extend type Mutation {
    createSeries(
      title: String!
      author: String!
      location: String!
      language: String!
    ): SeriesUpdateResponse!
  }

  type SeriesUpdateResponse {
    success: Boolean!
    message: String!
    series: Series
  }
`;
