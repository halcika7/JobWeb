/* eslint-disable no-unused-expressions */
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer
import { rootReducer, AppState } from './reducers';

// logger
import { appLoggerMiddleware } from './logger';
import { MakeStore, Context, createWrapper } from 'next-redux-wrapper';

const bindMiddleware = () => {
  const middlewares: Middleware[] = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(appLoggerMiddleware);
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  return applyMiddleware(...middlewares);
};

export const store = createStore(
  rootReducer,
  compose(bindMiddleware(), compose)
);

export const makeStore: MakeStore<AppState> = (_: Context) => {
  return store;
};

export const wrapper = createWrapper<AppState>(makeStore, { debug: false });
