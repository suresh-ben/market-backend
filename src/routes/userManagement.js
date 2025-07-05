const express = require('express');
const router = express.Router(); 
const { verifyOwnerAccessToken } = require('../middlewares/verifyUser');
const userManagementValidations = require('./validations/userManagementValidations');
const userManagementController = require('../controllers/userManagementController');

// Owner routes
router.post('/owner/create-manager', 
    verifyOwnerAccessToken, 
    userManagementValidations.createManagerValidations,
    userManagementController.handleCreateManager
);

module.exports = router;