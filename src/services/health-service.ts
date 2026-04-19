import logger from '../lib/logger.js';

export class HealthService {
    check(): string {
        logger.info('Healthcheck called');
        return 'OK';
    }
}
