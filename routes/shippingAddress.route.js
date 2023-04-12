const express = require("express");
const shipmentController = require("../controllers/shippingAddress.controllers");
const authValidator = require("../middlewares/auth.middleware");
const fieldValidation = require("../middlewares/fieldsValidators");
const shippingRoute = express.Router();

shippingRoute.post(
  "/addresses",
  [authValidator.verifytoken, fieldValidation.ShipmentFieldValidation],
  shipmentController.create
);

module.exports = shippingRoute;
