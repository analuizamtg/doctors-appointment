const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLID = require("graphql").GraphQLID;
const GraphQLString = require("graphql").GraphQLString;

exports.slotType = new GraphQLObjectType({
  name: "Slot",
  fields: function() {
    return {
      dateAndTime: {
        type: GraphQLString
      },
      endDateAndTime: {
        type: GraphQLString
      }
    };
  }
});
