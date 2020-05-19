/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const withOffline = require('next-offline');
const withImages = require('next-images');

require('dotenv').config();

const nextConfig = {
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: false,
  workboxOpts: {
    swDest: 'service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  experimental: {
    async rewrites() {
      return [
        {
          source: '/service-worker.js',
          destination: '/_next/static/service-worker.js',
        },
      ];
    },
  },
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    BACKEND_URL: process.env.BACKEND_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_SECRET_VALUE: process.env.TOKEN_SECRET_VALUE,
    TEST_TOKEN: process.env.TEST_TOKEN,
  },
  publicRuntimeConfig: {
    TEST_TOKEN: process.env.TEST_TOKEN,
  },
};

module.exports = withOffline(withImages(nextConfig));
