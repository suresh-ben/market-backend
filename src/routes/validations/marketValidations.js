const { body } = require("express-validator");
const requestValidator = require("../../middlewares/requestValidator");

const managerRequestStockUpdateValidations = [
    body("country_id")
        .exists().withMessage("Country ID is required")
        .isMongoId().withMessage("Invalid country ID format"),

    body("product_id")
        .exists().withMessage("Product ID is required")
        .isMongoId().withMessage("Invalid product ID format"),
    
    body("updatedQuantity")
        .exists().withMessage("Updated quantity is required")
        .isInt().withMessage("Updated quantity must be an integer"),

    body("updatedPrice")
        .exists().withMessage("Updated price is required")
        .isFloat({ gt: 0 }).withMessage("Updated price must be a positive number"),

    requestValidator
];

const ownerAcceptStockUpdateValidations = [
    body("request_id")
        .exists().withMessage("Request ID is required")
        .isMongoId().withMessage("Invalid Request ID format"),

    requestValidator
];

const ownerRejectStockUpdateValidations = [
    body("request_id")
        .exists().withMessage("Request ID is required")
        .isMongoId().withMessage("Invalid Request ID format"),

    requestValidator
];

const ownerCreateProductValidations = [
    body("name")
        .trim()
        .exists().withMessage("Product name should exists")
        .isString().withMessage("Product name must be a string"),
    
    body("description")
        .trim()
        .exists().withMessage("Product description should exists")
        .isString().withMessage("Product description must be a string"),   

    requestValidator
];

module.exports = {
    managerRequestStockUpdateValidations,
    ownerAcceptStockUpdateValidations,
    ownerRejectStockUpdateValidations,
    ownerCreateProductValidations
};
