const GraphQLSchema = require("graphql").GraphQLSchema;
const Query = require("./resolvers").Query;
const Mutation = require("./resolvers").Mutation;

exports.appointmentSchema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
