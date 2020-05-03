/* eslint-disable no-console */
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  DB_NAME,
  TEST_DB_NAME,
} = process.env;

const pg = new Pool({
  connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/postgres`,
});

pg.connect()
  .then(client => {
    client
      .query(`CREATE DATABASE ${DB_NAME}`)
      .then(() => {
        console.info('db created');
        client
          .query(`ALTER USER postgres SET timezone='UTC'`)
          .then(() => {
            console.warn('timezone set to UTC');
            client.release();
            process.kill(process.pid);
          })
          .catch(err => {
            client.release();
            console.warn('timezone not set to UTC');
            console.error(err);
            process.kill(process.pid);
          });
      })
      .catch(err => {
        console.log('err', err);
        client.release();
        console.info('db exists');
        process.kill(process.pid);
      });
    client
      .query(`CREATE DATABASE ${TEST_DB_NAME}`)
      .then(() => {
        console.info('db TEST_DB created');
      })
      .catch(err => {
        console.log('err', err);
        client.release();
        console.info('db TEST_DB exists');
        process.kill(process.pid);
      });
  })
  .catch(err => {
    console.error(err);
    process.kill(process.pid);
  });
