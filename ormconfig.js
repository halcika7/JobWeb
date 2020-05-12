/* eslint-disable no-nested-ternary */
const {
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  DB_NAME,
  NODE_ENV,
  MIGRATION,
  TEST_DB_NAME,
} = process.env;

module.exports = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: NODE_ENV === 'test' ? TEST_DB_NAME : DB_NAME,
  synchronize: true,
  logging: false,
  cache: false,
  entities:
    MIGRATION === 'true'
      ? ['packages/backend/dist/models/**/*.js']
      : NODE_ENV === 'production'
      ? ['dist/models/**/*.js']
      : ['src/models/**/*.ts'],
  migrations:
    MIGRATION === 'true'
      ? ['packages/backend/dist/migrations/**/*.js']
      : NODE_ENV === 'production'
      ? ['dist/migrations/**/*.js']
      : ['src/migrations/**/*.ts'],
  subscribers:
    MIGRATION === 'true'
      ? ['packages/backend/dist/subscribers/**/*.js']
      : NODE_ENV === 'production'
      ? ['dist/subscribers/**/*.js']
      : ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir:
      MIGRATION === 'true' || NODE_ENV === 'production'
        ? 'packages/backend/dist/models'
        : 'packages/backend/src/models',
    migrationsDir:
      MIGRATION === 'true' || NODE_ENV === 'production'
        ? 'packages/backend/dist/migrations'
        : 'packages/backend/src/migrations',
    subscribersDir:
      MIGRATION === 'true' || NODE_ENV === 'production'
        ? 'packages/backend/dist/subscribers'
        : 'packages/backend/src/subscribers',
  },
};
