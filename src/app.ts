import express from 'express';
import userRoutes from './routes/user-routes.js';
import friendRoutes from './routes/friend-routes.js';
import config from './config/config.js';
import { notFoundHandler } from './middleware/not-found-handler.js';
import { errorHandler } from './middleware/error-handler.js';
import jwt from 'jsonwebtoken';

const app: express.Application = express();
const port: number = config.port;

// Built-in middleware
app.use(express.json());

// Auth Middleware
app.use((_req, _res, _next) => {
    // Extract auth token
    const authHeader = _req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        _res.status(401).json({ error: 'No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    // Validate token
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
        const decoded = jwt.verify(token as string, jwtSecretKey);
    } catch (error) {
        _res.status(400).send({ error: 'Invalid Token' })
    }
    _next();
});

// Routes
app.use('/user', userRoutes);
app.use('/friend', friendRoutes);

// 404 catch-all (after all routes)
app.use(notFoundHandler);

// Generic Error Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Social media app listening on port ${port}`);
});

export default app;