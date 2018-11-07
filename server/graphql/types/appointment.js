const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLString = require("graphql").GraphQLString;
const userType = require("./user").userType;

exports.appointmentType = new GraphQLObjectType({
  name: "Appointment",
  fields: function() {
    return {
      endDateAndTime: {
        type: GraphQLString
      },
      dateAndTime: {
        type: GraphQLString
      },
      user: {
        type: userType
      }
    };
  }
});
