import { createLogger } from 'redux-logger';
import { Middleware } from 'redux';

export const appLoggerMiddleware: Middleware = createLogger({
  duration: true,
  timestamp: true,
  colors: {
    title: () => 'green',
    prevState: () => 'blue',
    action: () => 'orange',
    nextState: () => 'purple',
    error: () => 'red',
  },
});
