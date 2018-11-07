const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLID = require("graphql").GraphQLID;
const GraphQLString = require("graphql").GraphQLString;

exports.slotType = new GraphQLObjectType({
  name: "slot",
  fields: function() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      date: {
        type: GraphQLString
      },
      startTime: {
        type: GraphQLString
      },
      endTime: {
        type: GraphQLString
      }
    };
  }
});
