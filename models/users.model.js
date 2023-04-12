const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  shipment: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Shipment",
  },
  orderId: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Order",
  },
  createdAt: {
    type: Date,
    immuatable: true,
    default: () => {
      return Date.now();
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = mongoose.model("User", userSchema);
