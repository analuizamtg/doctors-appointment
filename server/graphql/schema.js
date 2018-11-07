const GraphQLSchema = require("graphql").GraphQLSchema;
const GraphQLObjectType = require("graphql").GraphQLObjectType;
const query = require("./resolvers").query;
var mutation = require("./resolvers").mutation;

exports.appointmentSchema = new GraphQLSchema({
  query: query,
  mutation: mutation
});
