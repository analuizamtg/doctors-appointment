const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLString = require("graphql").GraphQLString;
const GraphQLInputObjectType = require("graphql").GraphQLInputObjectType;

exports.userType = new GraphQLObjectType({
  name: "User",
  fields: function() {
    return {
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      }
    };
  }
});

exports.userInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: function() {
    return {
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      }
    };
  }
});
