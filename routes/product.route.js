const express = require("express");
const productscontroller = require("../controllers/product.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const productRouter = express.Router();

productRouter.get("/", productscontroller.getProducts);

productRouter.get("/categories", productscontroller.getProductsCategories);

productRouter.get("/:id", productscontroller.getProductsById);

productRouter.post(
  "/",
  authMiddleware.verifytoken,
  productscontroller.saveProduct
);

productRouter.put(
  "/:id",
  authMiddleware.verifytoken,
  productscontroller.updateProduct
);

productRouter.delete(
  "/:id",
  authMiddleware.verifytoken,
  productscontroller.deleteProduct
);

module.exports = productRouter;
