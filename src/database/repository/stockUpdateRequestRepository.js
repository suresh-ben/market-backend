const StockUpdateRequest = require('../models/StockUpdateRequest');
const { STOCK_REQUEST_STATUS } = require('../../config/constants');

async function createStockUpdateRequest(manager_id, stock_id, updatedQuantity, updatedPrice) {
    try {
        const stockUpdateRequest = new StockUpdateRequest({
            stock: stock_id,
            updatedQuantity,
            updatedPrice,
            requestedBy: manager_id,
            status: STOCK_REQUEST_STATUS.PENDING
        });

        await stockUpdateRequest.save();
        return stockUpdateRequest;
    } catch (error) {
        throw new Error(error.message || 'Error creating stock update request');
    }
}

async function acceptStockUpdateRequest(request_id, session) {
    try {
        const request = await StockUpdateRequest.findByIdAndUpdate(
            request_id, 
            { 
                status: STOCK_REQUEST_STATUS.APPROVED 
            }, 
            { session }
        );
        if (!request) throw new Error('Stock update request not found');

        return request;
    } catch (error) {
        if (session) await session.abortTransaction();
        throw new Error(error.message || 'Error accepting stock update request');
    }
}

async function rejectStockUpdateRequest(request_id) {
    try {
        const request = await StockUpdateRequest.findById(request_id);
        if (!request) throw new Error('Stock update request not found');

        request.status = STOCK_REQUEST_STATUS.REJECTED;
        await request.save();
        return request;
    } catch (error) {
        throw new Error(error.message || 'Error rejecting stock update request');
    }
}

async function getAllStockUpdateRequests() {
    try {
        const requests = await StockUpdateRequest.find()
            .populate({
                path: 'stock',
                populate: [
                { path: 'country' },
                { path: 'product' }
                ]
            })
            .populate('requestedBy').sort({ createdAt: -1 });
            
        return requests;
    } catch (error) {
        throw new Error(error.message || 'Error fetching all stock update requests');
    }
}

module.exports = {
    createStockUpdateRequest,
    acceptStockUpdateRequest,
    rejectStockUpdateRequest,
    getAllStockUpdateRequests
}