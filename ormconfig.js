const {
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  DB_NAME,
  NODE_ENV,
} = process.env;

module.exports = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  cache: false,
  entities:
    NODE_ENV === 'production'
      ? ['dist/models/**/*.js']
      : ['src/models/**/*.ts'],
  migrations:
    NODE_ENV === 'production'
      ? ['dist/migrations/**/*.js']
      : ['src/migrations/**/*.ts'],
  subscribers:
    NODE_ENV === 'production'
      ? ['dist/subscribers/**/*.js']
      : ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: NODE_ENV === 'production' ? 'dist/models' : 'src/models',
    migrationsDir:
      NODE_ENV === 'production' ? 'dist/migrations' : 'src/migrations',
    subscribersDir:
      NODE_ENV === 'production' ? 'dist/subscribers' : 'dist/subscribers',
  },
};
