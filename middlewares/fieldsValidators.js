const validators = require("../utils/validators");

exports.userFieldValidation = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "No data found !!",
    });
  }
  if (!validators.validateEmail(req.body.email)) {
    return res.status(400).send({
      message: `Invalid email format ${req.body.email}. It should be example mysite@ourearth.com,my.ownsite@ourearth.org,mysite@you.me.net
`,
    });
  }

  if (!validators.validatePhoneNumber(req.body.contactNumber)) {
    return res.status(400).send({
      message: `Invalid mobile number format ${req.body.contactNumber} should have 10 digits and contain only numbers`,
    });
  }

  next();
};

exports.ShipmentFieldValidation = (req, res, next) => {
  if (!validators.validatePhoneNumber(req.body.contactNumber)) {
    res.status(400).send({
      message: "Invalid contact number!",
    });
  }

  if (!validators.validateZipCode(req.body.zipCode)) {
    res.status(400).send({
      message: "Invalid zip code!",
    });
  }

  next();
};
