/* eslint-disable no-unused-expressions */
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import thunk from 'redux-thunk';

// reducer
import { rootReducer, AppState } from './RootReducer';

// logger
// import { appLoggerMiddleware } from './logger';
import { MakeStore, Context, createWrapper } from 'next-redux-wrapper';

const middlewares: Middleware[] = [thunk];

// process.env.NODE_ENV !== 'production' && middlewares.push(appLoggerMiddleware);

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), compose)
);

export const makeStore: MakeStore<AppState> = (_: Context) => {
  return store;
};

export const wrapper = createWrapper<AppState>(makeStore, { debug: false });

export default store;
