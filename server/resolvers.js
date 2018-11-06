var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var AppointmentModel = require("./models/appointment");
var appointmentType = require("./graphql/schema").appointmentType;

// Query
exports.queryType = new GraphQLObjectType({
  name: "Query",
  fields: function() {
    return {
      appointment: {
        type: appointmentType,
        resolve: function() {
          return {
            id: "432434",
            title: "appointment",
            endDateAndTime: "43244",
            startDateAndTime: "932832"
          };
        }
      }
    };
  }
});
