const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
  catName: {
    type: String,
    trim: true,
  },
  catNum: {
    type: String,
    required: [true, "must have a number"],
  },
  orders: {
    type: Array,
    required: [true, "must have"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: {
    type: String,
    default: new Date().toISOString().slice(0, 10),
  },
});

const Cat = mongoose.model("Cat", catSchema);

module.exports = Cat;
