const { DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_NAME } = process.env;

module.exports = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  cache: true,
  entities: ['dist/model/**/*.js'],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'dist/model',
    migrationsDir: 'dist/migration',
    subscribersDir: 'dist/subscriber',
  },
};
