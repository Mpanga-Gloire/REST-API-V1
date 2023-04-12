const express = require("express");
const orderController = require("../controllers/order.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const orderRouter = express.Router();

orderRouter.post("/orders", authMiddleware.verifytoken, orderController.order);

module.exports = orderRouter;
