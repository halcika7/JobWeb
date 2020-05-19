/* eslint-disable @typescript-eslint/no-var-requires */
const { setConfig } = require('next/config');
const config = require('./next.config');

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig(config.publicRuntimeConfig);

module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/serviceWorker.ts',
    '!src/routes/**',
    '!src/util/axios.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>config/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>__tests__/__mocks__/fileMock.ts',
  },
};
