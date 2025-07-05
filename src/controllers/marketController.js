const marketServices = require('../services/marketServices');

async function handleGetAllStocks(req, res) {
    try {
        const stocks = await marketServices.getAllStocks();
        res.json({ stocks });
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleGetStockDetails(req, res) {
    try {
        const stock_id = req.params.stockId;
        const stockDetails = await marketServices.getStockDetails(stock_id);

        res.json({ stockDetails });
    } catch (error) {
        console.error('Error fetching stock details:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleCreateProduct(req, res) {
    try {
        const { name, description } = req.body;
        const product = await marketServices.createProduct(name, description);

        res.json({ product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleGetAllProducts(req, res) {
    try {
        const products = await marketServices.getAllProducts();

        res.json({ products });
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleGetAllCountries(req, res) {
    try {
        const countries = await marketServices.getAllCountries();

        res.json({ countries });
    } catch (error) {
        console.error('Error fetching all countries:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleGetStocksByProduct(req, res) {
    try {
        const product_id = req.params.product_id;
        const stocks = await marketServices.getStocksByProduct(product_id);

        res.json({ stocks });
    } catch (error) {
        console.error('Error fetching stocks by product:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleGetStockByCountryAndProduct(req, res) {
    try {
        const { country_id, product_id } = req.params;
        const stock = await marketServices.getStockByCountryAndProduct(country_id, product_id);

        res.status(200).json({ stock });
    } catch (error) {
        console.error('Error fetching stock by country and product:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleRequestStockUpdate(req, res) {
    try {
        const { country_id, product_id, updatedQuantity, updatedPrice } = req.body;
        const { _id: manager_id } = req.manager;

        const updateRequest = await marketServices.requestStockUpdate(manager_id, country_id, product_id, updatedQuantity, updatedPrice);
        res.status(200).json({ message: 'Stock update requested successfully', updateRequest });
    } catch (error) {
        console.error('Error requesting stock update:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleGetAllStockUpdateRequests(req, res) {
    try {
        const requests = await marketServices.getAllStocksUpdateRequests();
        res.json({ requests });
    } catch (error) {
        console.error('Error fetching all stock update requests:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleAcceptStockUpdate(req, res) {
    try {
        const { request_id } = req.body;

        const { acceptedRequest, stockDetails } = await marketServices.acceptStockUpdate(request_id);
        res.status(200).json({ message: 'Stock update accepted successfully', acceptedRequest, stockDetails });
    } catch (error) {
        console.error('Error accepting stock update:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleRejectStockUpdate(req, res) {
    try {
        const { request_id } = req.body;

        const rejectedRequest = await marketServices.rejectStockUpdate(request_id);
        res.status(200).json({ message: 'Stock update rejected successfully', rejectedRequest });
    } catch (error) {
        console.error('Error rejecting stock update:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleGetLogs(req, res) {
    try {
        const logs = await marketServices.getLogs();
        res.json({ logs });
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

module.exports = {
    handleGetAllStocks,
    handleGetStockDetails,
    handleCreateProduct,
    handleGetAllProducts,
    handleGetAllCountries,
    handleGetStocksByProduct,
    handleRequestStockUpdate,
    handleAcceptStockUpdate,
    handleRejectStockUpdate,
    handleGetLogs,
    handleGetAllStockUpdateRequests,
    handleGetStockByCountryAndProduct
};