const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  dateAndTime: { type: Date, required: "Slot start date is required" },
  endDateAndTime: { type: Date, required: "Slot end date is required" }
});

module.exports = mongoose.model("Slot", SlotSchema);
