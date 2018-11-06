var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;

exports.appointmentType = new GraphQLObjectType({
  name: "appointment",
  fields: function() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      title: {
        type: GraphQLString
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
