import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/RootReducer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    compose
  )
);

export default store;
