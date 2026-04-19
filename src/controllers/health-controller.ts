import type { HealthService } from '../services/health-service.js';
import type { Request, Response } from 'express';

export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    healthcheck = (_req: Request, res: Response): void => {
        const status = this.healthService.check();
        res.status(200).json({ status });
    };
}
