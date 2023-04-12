const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const objectConverter = require("../utils/objectConverter");
const authconfigs = require("../configs/auth.config");

exports.signup = async (req, res) => {
  const userObject = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  try {
    const emailCheck = await User.findOne({ email: req.body.email });

    if (emailCheck) {
      return res.status(400).send({
        message: "Try any other email, this email is already registered!",
      });
    }

    const savedUser = await User.create(userObject);
    res.status(200).send(objectConverter.userObjConverter(savedUser));
  } catch (err) {
    console.log("err " + err);
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};

exports.signin = async (req, res) => {
  const requestObject = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await User.findOne({ email: requestObject.email });

    if (!user) {
      return res.status(400).send({
        message: "This email has not been registered!",
      });
    }

    if (!bcrypt.compareSync(requestObject.password, user.password)) {
      return res.status(400).send({
        message: "Invalid Credentials!",
      });
    }

    /**
     * Create token
     */
    const token = jwt.sign({ id: user._id }, authconfigs.SECRET);
    res.set("x-auth-token", token);
    res.status(200).send(objectConverter.responseConverter(user));
  } catch (err) {
    console.log("An error happened " + err);
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
};
