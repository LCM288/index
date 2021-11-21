/**
 * @packageDocumentation
 * @module Series
 */

import { ResolverFn, Resolvers } from "@/types/resolver";
import { Series } from "@/models/series";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase-admin/firestore";

type CreateSeriesArg = {
  title: string;
};

/** The response when mutating a single series */
interface SeriesUpdateResponse {
  /** Whether the mutation is successful */
  success: boolean;
  /** Additional information about the mutation */
  message: string;
  /** The new series' attributes */
  series?: Series;
}

// Query resolvers

/**
 * The resolver for seriesList Query
 * @async
 * @returns All the executives
 * @category Query Resolver
 */
const seriesListResolver: ResolverFn<null, Series[]> = async (
  _,
  __,
  { dataSources }
): Promise<Series[]> => {
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
const createSeriesResolver: ResolverFn<CreateSeriesArg, SeriesUpdateResponse> =
  async (_, arg, { dataSources }): Promise<SeriesUpdateResponse> => {
    const newSeries = await dataSources.seriesAPI.create({
      ...arg,
      id: uuidv4(),
      author: "unknown",
      location: "unknown",
      language: "unknown",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return {
      success: true,
      message: "Series created successfully",
      series: newSeries,
    };
  };

/** The resolvers associated with the Executive model */
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
    createSeries(title: String!): SeriesUpdateResponse!
  }

  type SeriesUpdateResponse {
    success: Boolean!
    message: String!
    series: Series
  }
`;
