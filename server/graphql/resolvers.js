const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const Appointment = require("../models/appointment");
const Slot = require("../models/slot");
const appointmentType = require("./types/appointment").appointmentType;
const slotType = require("./types/slot").slotType;
const GraphQLString = require("graphql").GraphQLString;

exports.query = new GraphQLObjectType({
  name: "Query",
  fields: () => {
    return {
      appointments: {
        type: new GraphQLList(appointmentType),
        resolve: () => {
          return Appointment.find((error, appointments) => {
            if (error) {
              throw error;
            }

            return appointments;
          });
        }
      },
      slots: {
        type: new GraphQLList(slotType),
        resolve: () => {
          return Slot.find((error, slots) => {
            if (error) {
              throw error;
            }
            return slots;
          });
        }
      }
    };
  }
});

exports.mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAppointment: {
      type: appointmentType,
      args: {
        title: {
          type: GraphQLString
        },
        endDateAndTime: {
          type: GraphQLString
        },
        dateAndTime: {
          type: GraphQLString
        }
      },
      resolve: (root, params) => {
        const appointmentModel = new Appointment(params);
        return appointmentModel
          .save()
          .then(appointment => appointment)
          .catch(e => {
            throw e;
          });
      }
    },
    createSlot: {
      type: slotType,
      args: {
        date: {
          type: GraphQLString
        },
        startTime: {
          type: GraphQLString
        },
        endTime: {
          type: GraphQLString
        }
      },
      resolve: (root, params) => {
        const slotModel = new Slot(params);
        return slotModel
          .save()
          .then(slot => slot)
          .catch(error => {
            throw error;
          });
      }
    }
  }
});
