import { createLogger } from 'redux-logger';

export const appLoggerMiddleware = createLogger({
  duration: true,
  timestamp: true,
  colors: {
    title: (action: Record<any, any>) => 'green',
    prevState: (prevState: Record<any, any>) => 'blue',
    action: (action: Record<any, any>) => 'orange',
    nextState: (nextState: Record<any, any>) => 'purple',
    error: (error: any, prevState: Record<any, any>) => 'red',
  },
});
