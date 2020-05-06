const express = require('express');
const productRouter = require('./resources/product/product.router');


const restRouter = express.Router({});

restRouter.use('/product', productRouter);

module.exports = restRouter;
