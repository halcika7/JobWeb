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

const drop = async () => {
  let client;
  try {
    client = await pg.connect();
    await client.query(`DROP DATABASE ${DB_NAME}`);
    await client.query(`DROP DATABASE ${TEST_DB_NAME}`);
    client.release();
    process.kill(process.pid);
  } catch (error) {
    console.log('drop -> error', error);
    if (client) client.release();
    process.kill(process.pid);
  }
};

drop();
