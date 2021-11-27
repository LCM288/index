import { Timestamp } from "firebase-admin/firestore";

/**
 * This representation of a series when stored in firestore
 */
export type Series = {
  id: string; // uuid
  title: string;
  author: string;
  location: string;
  language: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type SeriesCreateAttributes = Omit<
  Series,
  "id" | "createdAt" | "updatedAt"
>;

export type SeriesUpdateAttributes = Omit<Series, "createdAt" | "updatedAt">;

/**
 * The graphql schema definition for the Executive type
 * @internal
 */
export const typeDefs = `
  type Series {
    id: ID!
    title: String!
    author: String!
    location: String!
    language: String!
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
`;
