const mongoose = require('mongoose');
const { Schema } = mongoose;
const { STOCK_REQUEST_STATUS } = require("../../config/constants");

const stockUpdateRequestSchema = new Schema({
    stock: {
        type: Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    },

    // stock update should contain a quantity or price change
    updatedQuantity: {
        type: Number,
        default: null,
    },
    updatedPrice: {
        type: Number,
        default: null,
    },

    requestedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Manager',
        required: true
    },
    status: {
        type: String,
        enum: Object.values(STOCK_REQUEST_STATUS),
        default: STOCK_REQUEST_STATUS.PENDING,
        required: true,
    }
}, { timestamps: true });

const StockUpdateRequest = mongoose.model('StockUpdateRequest', stockUpdateRequestSchema);
module.exports = StockUpdateRequest;
