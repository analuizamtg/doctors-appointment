const GraphQLSchema = require("graphql").GraphQLSchema;
const GraphQLObjectType = require("graphql").GraphQLObjectType;
var query = require("./resolvers").query;

exports.appointmentSchema = new GraphQLSchema({
  query: query
});
