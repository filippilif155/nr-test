const { validationResult } = require('express-validator');

// Middleware function for validating the request data
exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
        }, {});
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Validation failed.',
            errors: errorMessages,
        });
    }
    next();
};
