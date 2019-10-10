const mongoose = require('../lib/connect'),
Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
    quantity: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;