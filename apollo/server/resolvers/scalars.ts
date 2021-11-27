import { GraphQLScalarType, Kind } from "graphql";
import { Timestamp } from "firebase-admin/firestore";

const timestampScalar = new GraphQLScalarType({
  name: "Timestamp",
  description: "Timestamp type in firestore",
  serialize(timestamp: unknown) {
    if (!(timestamp instanceof Timestamp)) {
      // invalid
      return 0;
    }
    // Convert outgoing timestampe to integer for JSON
    return timestamp.toMillis();
  },
  parseValue(value) {
    if (typeof value !== "number") {
      // invalid
      return null;
    }
    // Convert incoming integer to Timestamp
    return Timestamp.fromMillis(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Timestamp
      return Timestamp.fromMillis(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

export const scalarTypeDefs = `
  scalar Timestamp
`;

export const scalarResolvers = {
  Timestamp: timestampScalar,
};
