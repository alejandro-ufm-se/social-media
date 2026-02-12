import type { Request, Response, NextFunction } from "express";
import { ServiceException } from "../errors/serviceException.js";

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    if (err instanceof ServiceException) {
        res.status(err.httpStatus).json({
            Code: err.errorCode,
            Message: err.message,
        });
        return;
    }

    // Log the full error server-side for debugging
    console.error(`[ERROR] ${err.message}`, err.stack);

    // Never leak stack traces to the client in production
    const isProduction = process.env.NODE_ENV === "production";
    res.status(500).json({
        Code: 9999,
        Message: isProduction ? "Internal server error." : err.message,
    });
};
