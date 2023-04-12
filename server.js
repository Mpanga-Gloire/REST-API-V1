const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const authRouter = require("./routes/auth.route");
const shippingRoute = require("./routes/shippingAddress.route");
const productRoute = require("./routes/product.route");

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfuly connected to mongoDB");
});

db.on("error", () => {
  console.log("Error connecting to mongoDb");
  process.exit();
});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * ROUTERS
 */

app.use("/", authRouter);
app.use("/", shippingRoute);
app.use("/products", productRoute);

/**
 * ROUTERS
 * */

app.listen(dbConfig.PORT, () => {
  console.log(`Server started at port ${dbConfig.PORT}`);
});
