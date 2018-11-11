const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLString = require("graphql").GraphQLString;
const Appointment = require("../models/appointment");
const Slot = require("../models/slot");
const appointmentType = require("./types/appointment").appointmentType;
const slotType = require("./types/slot").slotType;
const userInputType = require("./types/user").userInputType;
const slotInputType = require("./types/slot").slotInputType;

exports.Query = new GraphQLObjectType({
  name: "Query",
  fields: () => {
    return {
      appointments: {
        type: new GraphQLList(appointmentType),
        resolve: () => {
          return Appointment.find({})
            .sort({ dateAndTime: "asc" })
            .exec()
            .then(appointments => appointments)
            .catch(e => {
              throw e;
            });
        }
      },
      slotsByDate: {
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
              start: { $gte: dayStart },
              end: { $lte: dayEnd }
            },
            (error, slots) => {
              if (error) {
                throw error;
              }
              return slots;
            }
          );
        }
      },
      slots: {
        type: new GraphQLList(slotType),
        resolve: (root, params) => {
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
    createSlots: {
      type: new GraphQLList(slotType),
      args: {
        slots: {
          type: new GraphQLList(slotInputType)
        }
      },
      resolve: (root, params) => {
        return Slot.insertMany(params.slots)
          .then(slots => slots)
          .catch(error => {
            throw error;
          });
      }
    }
  }
});
