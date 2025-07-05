const { body } = require("express-validator");
const requestValidator = require("../../middlewares/requestValidator");

const createManagerValidations = [
    body("name")
        .exists().withMessage("Manager name is required")
        .isString().withMessage("Manager name should be a string")
        .isLength({ max: 100 }).withMessage("Manager name should contain max 100 characters"),

    body("userId")
        .exists().withMessage("Manager userId is required")
        .isString().withMessage("Manager userId should be a string")
        .isLength({ max: 7, min: 7 }).withMessage("Manager userId should contain 7 characters"),
    
    body("countryName")
        .exists().withMessage("Country name is required")
        .isString().withMessage("Country name should be a string")
        .isLength({ max: 100 }).withMessage("Country name should contain max 100 characters"),

    body("countryDescription")
        .exists().withMessage("Country description is required")
        .isString().withMessage("Country description should be a string")
        .isLength({ max: 500 }).withMessage("Country description should contain max 500 characters"),

    body("email")
        .exists().withMessage("Email price is required")
        .isEmail().withMessage("Please provide a valid emailID"),

    body("password")
        .exists().withMessage("Password price is required")
        .isLength({ min: 6 }).withMessage("Password must contain atleast 6 characters"),

    requestValidator
];

module.exports = {
    createManagerValidations
};
