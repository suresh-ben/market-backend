const { body } = require("express-validator");
const requestValidator = require("../../middlewares/requestValidator");

const ownerLoginValidations = [
    body("userId")
        .trim()
        .notEmpty().withMessage("User ID is required")
        .isString().withMessage("User ID must be a string")
        .isLength({ min: 1 }).withMessage("User ID cannot be empty")
        .isLength({ max: 7 }).withMessage("User ID must be at most 7 characters long"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    requestValidator
];

const ownerChangePasswordValidations = [
    body("oldPassword")
        .trim()
        .notEmpty().withMessage("Old Password is required")
        .isLength({ min: 6 }).withMessage("Old Password must be at least 6 characters long"),

    body("newPassword")
        .trim()
        .notEmpty().withMessage("New Password is required")
        .isLength({ min: 6 }).withMessage("New Password must be at least 6 characters long"),

    requestValidator
];

const managerLoginValidations = [
    body("userId")
        .trim()
        .notEmpty().withMessage("User ID is required")
        .isString().withMessage("User ID must be a string")
        .isLength({ min: 1 }).withMessage("User ID cannot be empty")
        .isLength({ max: 7 }).withMessage("User ID must be at most 7 characters long"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    requestValidator
];

const managerChangePasswordValidations = [
    body("oldPassword")
        .trim()
        .notEmpty().withMessage("Old Password is required")
        .isLength({ min: 6 }).withMessage("Old Password must be at least 6 characters long"),

    body("newPassword")
        .trim()
        .notEmpty().withMessage("New Password is required")
        .isLength({ min: 6 }).withMessage("New Password must be at least 6 characters long"),

    requestValidator
];

module.exports = {
    ownerLoginValidations,
    ownerChangePasswordValidations,
    managerLoginValidations,
    managerChangePasswordValidations
};
