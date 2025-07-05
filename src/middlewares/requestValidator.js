const { validationResult } = require("express-validator");

function requestValidator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If there are no validation errors, proceed to the next middleware or route handler
    next();
}

module.exports = requestValidator;
