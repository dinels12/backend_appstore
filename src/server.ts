import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

export const server = new GraphQLServer({
  typeDefs: "src/graphql/schema.graphql",
  resolvers,
});
