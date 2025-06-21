import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
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

}