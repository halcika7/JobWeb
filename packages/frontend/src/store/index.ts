import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import thunk from 'redux-thunk';

// reducer
import { rootReducer } from './RootReducer';

// logger
import { appLoggerMiddleware } from './logger';

const middlewares: Middleware[] = [thunk];

process.env.NODE_ENV !== 'production' && middlewares.push(appLoggerMiddleware);

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), compose)
);

export default store;
