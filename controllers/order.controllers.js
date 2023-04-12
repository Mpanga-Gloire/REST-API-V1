const Product = require("../models/products.model");
const ShipmentAddres = require("../models/shippingAddress.model");
const Order = require("../models/order.model");
const User = require("../models/users.model");

exports.order = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.id });

    if (user.role != "USER") {
      return res.status(401).send({
        message: "You are not authorised to access this endpoint!",
      });
    }

    const product = await Product.findOne({ _id: req.body.productId });

    if (!product) {
      return res.status(200).send({
        message: `No Product found for ID - ${req.body.productId}!`,
      });
    }

    const address = await ShipmentAddres.findOne({ _id: req.body.addressId });

    if (!address) {
      return res.status(200).send({
        message: `No Address found for ID - ${req.body.addressId}!`,
      });
    }

    if (product.availableItems == 0) {
      return res.status(200).send({
        message: `Product with ID - ${req.body.addressId} is currently out of stock!`,
      });
    }

    const orderObject = {
      amount:
        req.body.quantity != undefined
          ? product.price * req.body.quantity
          : product.price,
    };

    const createdOrder = await Order.create(orderObject);

    user.orderId.push(createdOrder._id);

    await user.save();

    res.status(200).send({
      id: createdOrder._id,
      user: user,
      product: product,
      shippingAddress: {
        _id: address.id,
        name: address.name,
        phone: address.phone,
        street: address.street,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        zipcode: address.zipCode,
        user: user,
      },
      amount: createdOrder.amount,
      orderDate: createdOrder.orderDate,
    });
  } catch (error) {
    console.log("Some erro occured " + error);
    res.status(500).send({
      message: "Internal Server error",
    });
  }
};
