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
