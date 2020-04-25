import { createConnection } from 'typeorm';
import { LoggerFactory } from '@logger';

const logger = LoggerFactory.getLogger('db-connection');

export const connect = () =>
  createConnection()
    .then(() => logger.info('Database connected', 'create-db-connection'))
    .catch(err => logger.error(err, 'create-db-connection'));
