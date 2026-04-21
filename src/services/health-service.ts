import logger from '../lib/logger.js';

export class HealthService {
    check(): string {
        logger.info('Healthcheck called');
        logger.error('There was an error while checking services');
        logger.warn('Testing warnings.');
        return 'OK';
    }
}
