import { Router } from 'express';
import { HealthService } from '../services/health-service.js';
import { HealthController } from '../controllers/health-controller.js';

const healthRoutes = Router();

const healthService = new HealthService();
const healthController = new HealthController(healthService);

healthRoutes.get('/v1/healthcheck', healthController.healthcheck);

export default healthRoutes;
