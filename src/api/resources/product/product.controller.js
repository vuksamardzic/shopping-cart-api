const Product = require('./product.model');
const merge = require('lodash.merge');


const basicResponse = (res, payload) => {
    const {data, message, code} = payload;
    return res.status(code).json({
        data,
        message,
        code
    });
};

const transform = products => {
    return products.map(product => {
        const {id, productName, price, quantity} = product;
        return {
            id,
            productName,
            price,
            quantity
        };
    });
};

const productController = {
    getProducts: async (req, res, next) => {
        try {
            const products = await Product.find({});
            if (!products) {
                const payload = {
                    code: 404,
                    message: `Resource not found.`
                };
                return basicResponse(res, payload);
            }
            const payload = {
                code: 200,
                message: `Resource found.`,
                data: transform(products)
            };
            return basicResponse(res, payload);
        } catch (e) {
            next(e);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const {productName} = req.body;
            const exists = await Product.findOne({productName});
            if (exists) {
                const payload = {
                    code: 409,
                    message: `Resource exists.`
                };
                return basicResponse(res, payload);
            }

            const newProduct = await Product.create(req.body);

            const payload = {
                code: 200,
                message: `Resource [${newProduct.productName}] created.`
            };
            return basicResponse(res, payload);
        } catch (e) {
            next(e);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const product = await Product.findById(req.body.id);
            if (!product) {
                const payload = {
                    code: 404,
                    message: `Resource not found.`
                };
                return basicResponse(res, payload);
            }
            merge(product, req.body);
            const newProduct = await product.save();
            const payload = {
                code: 200,
                message: `Resource [${newProduct.productName}] edited.`
            };
            return basicResponse(res, payload);
        } catch (e) {
            next(e);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const product = await Product.findById(req.body.id);
            if (!product) {
                const payload = {
                    code: 404,
                    message: `Resource not found.`
                };
                return basicResponse(res, payload);
            }
            await product.remove();
            const payload = {
                code: 200,
                message: `Resource [${product.productName}] deleted.`
            };
            return basicResponse(res, payload);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = productController;
