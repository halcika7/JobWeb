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

const db = async () => {
  let client;
  try {
    client = await pg.connect();
    await client.query(`CREATE DATABASE ${DB_NAME}`);
    await client.query(`ALTER USER postgres SET timezone='UTC'`);
    await client.query(`CREATE DATABASE ${TEST_DB_NAME}`);
    client.release();
    process.kill(process.pid);
  } catch (err) {
    if (client) client.release();
    console.error(err);
    process.kill(process.pid);
  }
};

db();
