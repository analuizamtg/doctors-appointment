const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  start: { type: Date, required: "Slot start date is required" },
  end: { type: Date, required: "Slot end date is required" }
});

module.exports = mongoose.model("Slot", SlotSchema);
