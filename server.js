const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");

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

app.listen(dbConfig.PORT, () => {
  console.log(`Server started at port ${dbConfig.PORT}`);
});
