const Shipment = require("../models/shippingAddress.model");
const User = require("../models/users.model");

exports.create = async (req, res) => {
  const requestObj = {
    name: req.body.name,
    contactNumber: req.body.contactNumber,
    street: req.body.street,
    landmark: req.body.landmark,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
  };

  try {
    const savedShipment = await Shipment.create(requestObj);
    const user = await User.findOne({ _id: req.id });

    res.status(200).send({
      _id: savedShipment._id,
      name: savedShipment.name,
      contactNumber: savedShipment.contactNumber,
      street: savedShipment.street,
      landmark: savedShipment.landmark,
      city: savedShipment.city,
      state: savedShipment.state,
      zipCode: savedShipment.zipCode,
      createdAt: savedShipment.createdAt,
      updatedAt: savedShipment.updatedAt,
      user: user,
    });
  } catch (err) {
    console.log("An error accured " + err);

    res.status(500).send({
      message: "Internal Server error",
    });
  }
};
