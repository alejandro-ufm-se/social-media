import express from 'express';
import userRoutes from './routes/user-routes.js';
import config from './config/config.js';
import type { Request, Response, NextFunction } from 'express';


const app: express.Application = express();
const port: number = config.port;

app.use(express.json())

app.use((_req, _res, _next) => {
    console.log(`Time Log ${Date.now()}!`);
    _next();
    },
);

app.use('/user', userRoutes);

// Error Middleware
app.use((_err: Error, _req: Request, _res: Response, _next: NextFunction) => {
    console.error(_err.stack);
    _res.status(500).send(_err.message);
});

app.listen(port, () => {
    console.log(`Social media app listening on port ${port}`);
})