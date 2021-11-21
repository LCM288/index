import { Timestamp } from "firebase-admin/firestore";
// The type for the Series model
export type Series = {
  id: string; // uuid
  title: string;
  author: string;
  location: string;
  language: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

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
    createdAt: String!
    updatedAt: String!
  }
`;
