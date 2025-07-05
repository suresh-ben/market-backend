const express = require('express');
const router = express.Router(); 
const { verifyManagerAccessToken, verifyOwnerAccessToken } = require('../middlewares/verifyUser');
const marketValidations = require('./validations/marketValidations');
const marketController = require('../controllers/marketController');

// Manager routes
router.get('/manager/all-stocks', 
    verifyManagerAccessToken, 
    marketController.handleGetAllStocks
);

router.get('/manager/stocks/:stock_id',
    verifyManagerAccessToken, 
    marketController.handleGetStockDetails
);

router.get('/manager/stocks-by-product/:product_id',
    verifyManagerAccessToken, 
    marketController.handleGetStocksByProduct
);

router.get('/manager/stock-by-country-and-product/:country_id/:product_id',
    verifyManagerAccessToken,
    marketController.handleGetStockByCountryAndProduct
);

router.post('/manager/request-stock-update',
    verifyManagerAccessToken,
    marketValidations.managerRequestStockUpdateValidations,
    marketController.handleRequestStockUpdate
);

router.get('/manager/all-products',
    verifyManagerAccessToken, 
    marketController.handleGetAllProducts
);

router.get('/manager/all-countries',
    verifyManagerAccessToken, 
    marketController.handleGetAllCountries
)

// Owner routes
router.get('/owner/all-stocks', 
    verifyOwnerAccessToken, 
    marketController.handleGetAllStocks
);

router.get('/owner/stocks/:stockId',
    verifyOwnerAccessToken, 
    marketController.handleGetStockDetails
);

router.post('/owner/create-product',
    verifyOwnerAccessToken, 
    marketValidations.ownerCreateProductValidations,
    marketController.handleCreateProduct
);

router.get('/owner/all-products',
    verifyOwnerAccessToken, 
    marketController.handleGetAllProducts
);

router.get('/owner/all-countries',
    verifyOwnerAccessToken, 
    marketController.handleGetAllCountries
)

router.get('/owner/stocks-by-product/:product_id',
    verifyOwnerAccessToken, 
    marketController.handleGetStocksByProduct
);

router.get('/owner/get-all-stock-update-requests', 
    verifyOwnerAccessToken, 
    marketController.handleGetAllStockUpdateRequests
)

router.post('/owner/accept-stock-update', 
    verifyOwnerAccessToken, 
    marketValidations.ownerAcceptStockUpdateValidations,
    marketController.handleAcceptStockUpdate
);

router.post('/owner/reject-stock-update', 
    verifyOwnerAccessToken,
    marketValidations.ownerRejectStockUpdateValidations,
    marketController.handleRejectStockUpdate
);

router.get('/owner/get-logs', 
    verifyOwnerAccessToken, 
    marketController.handleGetLogs
);

module.exports = router;