import { createLogger } from 'redux-logger';
import { Middleware } from 'redux';

export const appLoggerMiddleware: Middleware = createLogger({
  duration: true,
  timestamp: true,
});
