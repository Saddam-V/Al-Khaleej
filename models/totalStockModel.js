const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  catNum: {
    type: Number,
    required: [true, "A Catalogue must have a name"],
    trim: true,
    // maxlength: [40, "A Catalogue name must have less or equal then 40 characters"],
    // minlength: [10, "A Catalogue name must have more or equal then 10 characters"],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  colNum: {
    type: String,
    required: [true, "must have a number"],
  },
  //   rate: {
  //     type: Number,
  //     required: [true, "must have a number"],
  //   },
  meter: {
    type: Number,
    required: [true, "must have a meter"],
  },
  totalSold: {
    type: Number,
    required: [true, "must have sale"],
  },
  // priceDiscount: {
  //   type: Number,
  //   validate: {
  //     validator: function (val) {
  //       // this only points to current doc on NEW document creation
  //       return val < this.price;
  //     },
  //     message: "Discount price ({VALUE}) should be below regular price",
  //   },
  // },
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

const TotalStock = mongoose.model("TotalStock", stockSchema);

module.exports = TotalStock;
