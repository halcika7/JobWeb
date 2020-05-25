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
      : ['dist/models/**/*.js'],
  migrations:
    MIGRATION === 'true'
      ? ['packages/backend/dist/migrations/**/*.js']
      : ['dist/migrations/**/*.js'],
  subscribers:
    MIGRATION === 'true'
      ? ['packages/backend/dist/subscribers/**/*.js']
      : ['dist/subscribers/**/*.js'],
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
