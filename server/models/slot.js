const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  date: { type: Date, required: "Slot date is required" },
  startTime: { type: Date, required: "Slot start time is required" },
  endTime: { type: Date, required: "Slot end time is required" }
});

module.exports = mongoose.model("Slot", SlotSchema);
