const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLString = require("graphql").GraphQLString;
const AppointmentModel = require("../models/appointment");
const appointmentType = require("./types/appointment").appointmentType;

exports.query = new GraphQLObjectType({
  name: "Query",
  fields: () => {
    return {
      appointments: {
        type: new GraphQLList(appointmentType),
        resolve: () => {
          return [
            {
              id: "432434",
              title: "appointment",
              endDateAndTime: "43244",
              startDateAndTime: "932832"
            }
          ];
        }
      },
      appointment: {
        type: appointmentType,
        args: { id: { type: GraphQLString } },
        resolve: () => {
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
