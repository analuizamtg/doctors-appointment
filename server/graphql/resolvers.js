const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLString = require("graphql").GraphQLString;
const Appointment = require("../models/appointment");
const Slot = require("../models/slot");
const appointmentType = require("./types/appointment").appointmentType;
const slotType = require("./types/slot").slotType;
const userInputType = require("./types/user").userInputType;

exports.Query = new GraphQLObjectType({
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
        args: {
          date: {
            type: GraphQLString
          }
        },
        resolve: (root, params) => {
          const slotDate = new Date(params.date);
          const dayStart = slotDate.setHours(0, 0, 0, 0);
          const dayEnd = slotDate.setHours(23, 59, 59, 999);
          return Slot.find(
            {
              dateAndTime: { $gte: dayStart },
              endDateAndTime: { $lte: dayEnd }
            },
            (error, slots) => {
              if (error) {
                throw error;
              }
              return slots;
            }
          );
        }
      }
    };
  }
});

exports.Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAppointment: {
      type: appointmentType,
      args: {
        user: {
          type: userInputType
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
        dateAndTime: {
          type: GraphQLString
        },
        endDateAndTime: {
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
