var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var queryType = require("../resolvers").queryType;

exports.appointmentSchema = new GraphQLSchema({
  query: queryType
});
