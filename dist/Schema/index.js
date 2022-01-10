"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {},
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {},
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
