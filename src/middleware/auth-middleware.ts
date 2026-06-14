import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../lib/logger.js';

const publicPaths = [
    '/auth/v1/login',
    '/user/v1/register',
    '/health/v1/healthcheck',
];

interface JwtPayload {
    sub: number;
    email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (publicPaths.includes(req.path)) {
        next();
        return;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.error('Missing or malformed authorization header', { path: req.path, method: req.method });
        res.status(401).json({ error: 'No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
        const payload = jwt.verify(token as string, jwtSecretKey) as unknown as JwtPayload;
        req.user = { id: Number(payload.sub), email: payload.email };
        next();
    } catch (error) {
        logger.error('Invalid token', { path: req.path, method: req.method });
        res.status(401).json({ error: 'Invalid Token' });
    }
};
