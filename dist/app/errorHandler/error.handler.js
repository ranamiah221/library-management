"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res) => {
    const errorResponse = {
        message: 'Something went wrong',
        success: false,
        error: err
    };
    if (err.name === 'ValidationError') {
        errorResponse.message = 'Validation failed';
    }
    if (err.name === 'CastError') {
        errorResponse.message = 'Invalid ID format';
    }
    res.status(400).json(errorResponse);
};
exports.errorHandler = errorHandler;
