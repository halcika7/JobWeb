import { createConnection } from 'typeorm';
import { LoggerFactory } from '../util/logger/LoggerFactory';

const logger = LoggerFactory.getLogger('db-connection');

export const connect = () =>
  createConnection()
    .then(() => logger.info('Database connected', 'create-db-connection'))
    .catch(err => logger.error(err, 'create-db-connection'));
