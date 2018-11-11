const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLString = require("graphql").GraphQLString;
const GraphQLInputObjectType = require("graphql").GraphQLInputObjectType;
exports.slotType = new GraphQLObjectType({
  name: "Slot",
  fields: function() {
    return {
      start: {
        type: GraphQLString
      },
      end: {
        type: GraphQLString
      }
    };
  }
});

exports.slotInputType = new GraphQLInputObjectType({
  name: "SlotInput",
  fields: function() {
    return {
      start: {
        type: GraphQLString
      },
      end: {
        type: GraphQLString
      }
    };
  }
});
