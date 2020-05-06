const express = require("express");
const {createProduct, getProducts, updateProduct, deleteProduct} = require("./product.controller");
const productRouter = express.Router({});


productRouter.route("/")
    .get(getProducts)
    .put(updateProduct)
    .post(createProduct)
    .delete(deleteProduct);

module.exports = productRouter;
