const express = require("express");
const fieldsMiddleware = require("../middlewares/fieldsValidators");
const authController = require("../controllers/auth.controllers");
const authRouter = express.Router();

authRouter.post(
  "/users",
  fieldsMiddleware.userFieldValidation,
  authController.signup
);
authRouter.post("/auth", authController.signin);

module.exports = authRouter;
