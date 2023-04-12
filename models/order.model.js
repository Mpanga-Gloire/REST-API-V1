const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  amount: {
    type: Number,
    require: true,
  },
  orderDate: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
