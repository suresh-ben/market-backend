const mongoose = require('mongoose');
const stockRepository = require('../database/repository/stockRepository');
const stockUpdateRequestRepository = require('../database/repository/stockUpdateRequestRepository');
const productRepository = require("../database/repository/ProductRepository");
const countryRepository = require("../database/repository/countryRepository");

async function getAllStocks() {
    try {
        const stocks = await stockRepository.getAllStocksGroupedByCountry();
        return stocks;
    } catch (error) {
        throw new Error(error.message || 'Error fetching all stocks');
    }
}

async function getStockDetails(stock_id) {
    try {
        const stockDetails = await stockRepository.getStockDetails(stock_id);
        
        return stockDetails;
    } catch (error) {
        throw new Error(error.message || 'Error fetching stock details');
    }
}

async function createProduct(name, description) {
    try {
        const product = await productRepository.createProduct(name, description);
        return product;
    } catch (error) {
        throw new Error(error.message || 'Error fetching stock details');
    }
}

async function getAllProducts() {
    try {
        const products = await productRepository.getAllProducts();
        return products;
    } catch (error) {
        throw new Error(error.message || 'Error fetching stock details');
    }
}

async function getAllCountries() {
    try {
        const countries = await countryRepository.getAllCountries();
        return countries;
    } catch (error) {
        throw new Error(error.message || 'Error fetching stock details');
    }
}

async function getStocksByProduct(product_id) {
    try {
        const stocks = await stockRepository.getStocksByProduct(product_id);
        
        return stocks;
    } catch (error) {
        throw new Error(error.message || 'Error fetching stocks by product');
    }
}

async function getStockByCountryAndProduct(country_id, product_id) {
    try {
        const stock = await stockRepository.getStockByCountryAndProduct(country_id, product_id);
        return stock;
    } catch (error) {
        throw new Error(error.message || 'Error fetching stock by country and product');
    }
}

async function requestStockUpdate(manager_id, country_id, product_id, updatedQuantity, updatedPrice) {
    try {
        // get the stock using country and product IDs
        // if not found, create a new stock
        let stock = await stockRepository.getStockByCountryAndProduct(country_id, product_id);
        if(!stock) 
            stock = await stockRepository.createStock(country_id, product_id);

        const updateRequest = await stockUpdateRequestRepository.createStockUpdateRequest(
            manager_id, 
            stock._id, 
            updatedQuantity, 
            updatedPrice
        );
        
        return updateRequest;
    } catch (error) {
        console.error('Error requesting stock update:', error);
        throw new Error(error.message || 'Error requesting stock update');
    }
}

async function getAllStocksUpdateRequests() {
    try {
        const updateRequests = await stockUpdateRequestRepository.getAllStockUpdateRequests();
        return updateRequests;
    } catch (error) {
        throw new Error(error.message || 'Error fetching all stock update requests');
    }
}

async function acceptStockUpdate(request_id) {
    try {
        const session = await mongoose.startSession();

        // Start a transaction
        session.startTransaction();

        // mark the request as accepted
        const acceptedRequest = await stockUpdateRequestRepository.acceptStockUpdateRequest(request_id, session);

        // change the stock details
        const stockDetails = await stockRepository.updateStockDetails(
            acceptedRequest.stock, 
            acceptedRequest.updatedQuantity, 
            acceptedRequest.updatedPrice
        );

        // commit the transaction
        await session.commitTransaction();
        session.endSession();

        return {
            acceptedRequest,
            stockDetails
        };
    } catch (error) {
        if (session) await session.abortTransaction();
        throw new Error(error.message || 'Error accepting stock update request');
    }
}

async function rejectStockUpdate(request_id) {
    try {
        const rejectedRequest = await stockUpdateRequestRepository.rejectStockUpdateRequest(request_id);
        return rejectedRequest;
    } catch (error) {
        throw new Error(error.message || 'Error rejecting stock update request');
    }
}

async function getLogs() {
    try {

    } catch (error) {

    }
}

module.exports = {
    getAllStocks,
    getStockDetails,
    createProduct,
    getAllStocksUpdateRequests,
    getAllProducts,
    getAllCountries,
    getStocksByProduct,
    requestStockUpdate,
    acceptStockUpdate,
    rejectStockUpdate,
    getLogs,
    getStockByCountryAndProduct
};