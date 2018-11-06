var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
  user: {
    name: { type: String, required: "name is required" },
    email: { type: String, required: "email is required" }
  },
  dateAndTime: { type: Date, required: "Appointment start date is required" },
  endDateAndTime: { type: Date, required: "Appointment end date is required" }
});

AppointmentSchema.path("dateAndTime").validate(function(value, done) {
  var self = this;
  return mongoose.models.Appointment.find(
    {
      _id: { $ne: self._id },
      $or: [
        { dateAndTime: { $lt: self.endDateAndTime, $gte: self.dateAndTime } },
        { endDateAndTime: { $lte: self.endDateAndTime, $gt: self.dateAndTime } }
      ]
    },
    function(err, appointments) {
      done(!appointments || appointments.length === 0);
    }
  );
}, "The appointment overlaps with other appointments");

AppointmentSchema.path("dateAndTime").validate(function(value, done) {
  done(value > new Date());
}, "The appointment cannot be scheduled in the past");

AppointmentSchema.path("endDateAndTime").validate(function(value, done) {
  done(value > this.dateAndTime);
}, "End date must be greater than start date");

module.exports = mongoose.model("Appointment", AppointmentSchema);
