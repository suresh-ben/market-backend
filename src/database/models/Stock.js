const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockSchema = new Schema({
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        min: 0
    },
    price: {
        type: Number,
        min: 0
    },
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
