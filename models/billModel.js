const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  custName: {
    type: String,
    required: [true, "must have a name"],
    trim: true,
    // maxlength: [40, "A Catalogue name must have less or equal then 40 characters"],
    // minlength: [10, "A Catalogue name must have more or equal then 10 characters"],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  custNum: {
    type: String,
    required: [true, "must have a number"],
  },
  orders: {
    type: Array,
    required: [true, "must have"],
  },
  // catNum: {
  //   type: Number,
  //   required: [true, "A Catalogue must have a name"],
  //   trim: true,
  //   // maxlength: [40, "A Catalogue name must have less or equal then 40 characters"],
  //   // minlength: [10, "A Catalogue name must have more or equal then 10 characters"],
  //   // validate: [validator.isAlpha, 'Tour name must only contain characters']
  // },
  // colNum: {
  //   type: String,
  //   required: [true, "must have a number"],
  // },
  // //   rate: {
  // //     type: Number,
  // //     required: [true, "must have a number"],
  // //   },
  // meter: {
  //   type: Number,
  //   required: [true, "must have a meter"],
  // },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val < this.price;
      },
      message: "Discount price ({VALUE}) should be below regular price",
    },
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

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
