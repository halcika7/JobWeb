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
      .query(`DROP DATABASE ${DB_NAME}`)
      .then(() => {
        console.info('db dropped');
      })
      .catch(() => {
        console.info('db not dropped');
      });
    client
      .query(`DROP DATABASE ${TEST_DB_NAME}`)
      .then(() => {
        console.info('db TEST_DB dropped');
        client.release();
        process.kill(process.pid);
      })
      .catch(() => {
        client.release();
        console.info('db TEST_DB not dropped');
        process.kill(process.pid);
      });
  })
  .catch(err => {
    console.error(err);
    process.kill(process.pid);
  });
