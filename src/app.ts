import express from 'express';
import userRoutes from './routes/user-routes.js';
import friendRoutes from './routes/friend-routes.js';
import authRoutes from './routes/auth-routes.js';
import config from './config/config.js';
import { notFoundHandler } from './middleware/not-found-handler.js';
import { errorHandler } from './middleware/error-handler.js';
import { authMiddleware } from './middleware/auth-middleware.js';

const app: express.Application = express();
const port: number = config.port;

// Built-in middleware
app.use(express.json());

// Auth Middleware
app.use(authMiddleware);

// Routes
app.use('/auth', authRoutes);
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