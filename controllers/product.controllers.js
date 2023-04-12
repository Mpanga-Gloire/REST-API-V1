const Product = require("../models/products.model");
const User = require("../models/users.model");
const objectConverter = require("../utils/objectConverter");
const updateProduct = require("../utils/updateProduct");

exports.getProducts = async (req, res) => {
  const queryObj = {};

  const optionObject = {
    direction: req.query.direction ? req.query.direction : "DESC",
    sortBy: req.query.sortBy ? req.query.sortBy : "_id",
  };

  if (req.query.category != undefined) {
    queryObj.category = req.query.category;
  }

  if (req.query.name != undefined) {
    queryObj.name = req.query.name;
  }
  try {
    const sortBy = {
      [optionObject.sortBy]: optionObject.direction == "DESC" ? -1 : 1,
    };

    const products = await Product.find(queryObj).sort(sortBy);
    res.status(200).send(products);
  } catch (err) {
    console.log("Some erro occured " + err);
    res.status(500).send({
      message: "Internal Server error",
    });
  }
};

exports.getProductsCategories = async (req, res) => {
  try {
    const product = await Product.find({}, { category: 1, _id: 0 });
    if (!product) {
      return res.status(400).send({
        message: "No category found",
      });
    }

    res.status(200).send(objectConverter.productCoverter(product));
  } catch (err) {
    console.log("Some erro occured " + err);
    res.status(500).send({
      message: "Internal Server error",
    });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(400).send({
        message: "No product with this id",
      });
    }

    res.status(200).send(product);
  } catch (err) {
    console.log("Some erro occured " + err);
    res.status(500).send({
      message: "Internal Server error",
    });
  }
};

exports.saveProduct = async (req, res) => {
  const requestObj = {
    name: req.body.name,
    availableItems: req.body.availableItems,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    imageURL: req.body.imageURL,
    manufacturer: req.body.name,
  };
  try {
    const user = await User.findOne({ _id: req.id });

    if (user.role != "ADMIN") {
      return res.status(401).send({
        message: "You are not authorised to access this endpoint!",
      });
    }

    const savedProduct = await Product.create(requestObj);

    res.status(200).send(savedProduct);
  } catch (error) {
    console.log("Some erro occured " + error);
    res.status(500).send({
      message: "Internal Server error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.id });

    if (user.role != "ADMIN") {
      return res.status(401).send({
        message: "You are not authorised to access this endpoint!",
      });
    }

    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(200).send({
        message: `Product with this ${req.params.id} does not exist`,
      });
    }

    const updateObject = updateProduct.updateProduct(product, req.body);

    const savedProduct = await updateObject.save();

    return res.status(200).send(savedProduct);
  } catch (error) {
    console.log("Some erro occured " + error);
    res.status(500).send({
      message: "Internal Server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.id });

    if (user.role != "ADMIN") {
      return res.status(401).send({
        message: "You are not authorised to access this endpoint!",
      });
    }

    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(200).send({
        message: `No Product found for ID - ${req.params.id}!`,
      });
    }

    await product.deleteOne();

    res.status(200).send({
      message: `Product with ID - ${req.params.id} deleted successfully!`,
    });
  } catch (error) {
    console.log("Some erro occured " + error);
    res.status(500).send({
      message: "Internal Server error",
    });
  }
};
