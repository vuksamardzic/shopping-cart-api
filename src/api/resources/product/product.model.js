const {Schema, model} = require('mongoose');


const schema = {
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
};

const productSchema = Schema(schema);

module.exports = User = model('product', productSchema);
