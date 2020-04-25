import { Pool } from 'pg';
import { config } from 'dotenv';
import { LoggerFactory } from '@logger';

const logger = LoggerFactory.getLogger('create-db');

config();

const { DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_NAME } = process.env;

const pg = new Pool({
  connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/postgres`,
});

pg.connect()
  .then(client => {
    client
      .query(`CREATE DATABASE ${DB_NAME}`)
      .then(() => {
        logger.info('db created', 'create-db');
        client
          .query(`ALTER USER postgres SET timezone='UTC'`)
          .then(() => {
            logger.warning('timezone set to UTC', 'set-utc');
            client.release();
            process.kill(process.pid);
          })
          .catch(err => {
            client.release();
            logger.warning('timezone not set to UTC', 'errpr-utc');
            logger.error(err, 'error-utc');
            process.kill(process.pid);
          });
      })
      .catch(err => {
        client.release();
        logger.info('db exists', 'create-db');
        process.kill(process.pid);
      });
  })
  .catch(err => {
    logger.error(err, 'db-connection');
    process.kill(process.pid);
  });
