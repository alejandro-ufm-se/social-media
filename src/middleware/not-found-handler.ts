import type { Request, Response, NextFunction } from "express";
import { ServiceException } from "../errors/serviceException.js";

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction): void => {
    next(new ServiceException(9404, "The requested resource was not found.", 404));
};
