const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLID = require("graphql").GraphQLID;
const GraphQLString = require("graphql").GraphQLString;

exports.appointmentType = new GraphQLObjectType({
  name: "appointment",
  fields: function() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      user: {
        type: userType
      },
      endDateAndTime: {
        type: GraphQLString
      },
      startDateAndTime: {
        type: GraphQLString
      }
    };
  }
});

const userType = new GraphQLObjectType({
  name: "user",
  fields: function() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      }
    };
  }
});
