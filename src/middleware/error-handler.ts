import type { Request, Response, NextFunction } from "express";
import { ServiceException } from "../errors/serviceException.js";
import logger from "../lib/logger.js";

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    if (err instanceof ServiceException) {
        logger.error('Service exception', {
            path: _req.path,
            method: _req.method,
            errorCode: err.errorCode,
            httpStatus: err.httpStatus,
            message: err.message,
        });
        res.status(err.httpStatus).json({
            Code: err.errorCode,
            Message: err.message,
        });
        return;
    }

    logger.error('Unhandled error', {
        path: _req.path,
        method: _req.method,
        message: err.message,
        stack: err.stack,
    });

    // Never leak stack traces to the client in production
    const isProduction = process.env.NODE_ENV === "production";
    res.status(500).json({
        Code: 9999,
        Message: isProduction ? "Internal server error." : err.message,
    });
};
