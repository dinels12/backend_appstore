"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const graphql_yoga_1 = require("graphql-yoga");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
exports.server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "src/graphql/schema.graphql",
    resolvers: resolvers_1.default,
});
