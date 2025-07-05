const express = require('express');
const router = express.Router(); 
const authValidations = require('./validations/authValidations');
const { verifyOwnerRefreshToken, verifyOwnerAccessToken, verifyManagerRefreshToken, verifyManagerAccessToken } = require("../middlewares/verifyUser");
const authController = require('../controllers/authController');

// Owner routes
router.post('/owner/login', 
    authValidations.ownerLoginValidations, 
    authController.handleOwnerLogin
);

router.get('/owner/generate-access-token', 
    verifyOwnerRefreshToken,
    authController.handleOwnerGenerateAccessToken
);

router.post('/owner/logout', 
    verifyOwnerAccessToken,
    authController.handleOwnerLogout
);

router.post('/owner/change-password', 
    authValidations.ownerChangePasswordValidations,
    verifyOwnerAccessToken,
    authController.handleOwnerChangePassword
);

router.get('/owner/info',
    verifyOwnerAccessToken,
    authController.handleGetOwnerDetails
)

// Manager routes
router.post('/manager/login', 
    authValidations.managerLoginValidations, 
    authController.handleManagerLogin
);

router.get('/manager/generate-access-token', 
    verifyManagerRefreshToken,
    authController.handleManagerGenerateAccessToken
);

router.post('/manager/logout', 
    verifyManagerAccessToken,
    authController.handleManagerLogout
);

router.post('/manager/change-password', 
    authValidations.managerChangePasswordValidations,
    verifyManagerAccessToken,
    authController.handleManagerChangePassword
);

router.get('/manager/info',
    verifyManagerAccessToken,
    authController.handleGetManagerDetails
)

module.exports = router;