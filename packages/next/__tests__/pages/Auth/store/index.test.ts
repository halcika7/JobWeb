// import jwt_decode from 'jwt-decode';
import store, { makeStore } from '@store/index';
import {
  authStart,
  authFailed,
  authReset,
  getTokenRole,
  resetMessage,
  loginSuccess,
} from '@containers/Auth/store/actions';
import { AuthReducer, INITIAL_STATE } from '@containers/Auth/store/reducer';
import { AuthActions } from '@containers/Auth/store/types';
import { Context } from 'next-redux-wrapper';

describe('Auth actions testing', () => {
  it('auth start action', () => {
    const start = authStart({ username: 'halcika', password: 'sdasdas' });

    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.payload).toEqual({
      values: { username: 'halcika', password: 'sdasdas' },
    });
    expect(start.type).toBe(AuthActions.AUTH_START);
    expect(state.values.username).toBe('halcika');
  });

  it('auth failed action without message', () => {
    const start = authFailed({
      status: 200,
      limit: 'some',
      errors: { ...INITIAL_STATE.errors, city: 'is required' },
    });

    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.payload).toEqual({
      status: 200,
      limit: 'some',
      errors: { ...INITIAL_STATE.errors, city: 'is required' },
    });
    expect(start.type).toBe(AuthActions.AUTH_FAILED);
    expect(state.status).toBe(200);
  });

  it('auth failed action for refresh', () => {
    const start = authFailed({
      status: 200,
      refresh: true,
    });

    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.payload).toEqual({
      status: 200,
      refresh: true,
    });
    expect(start.type).toBe(AuthActions.AUTH_FAILED);
    expect(state.status).toBe(200);
  });

  it('auth reset action', () => {
    const start = authReset();

    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.payload).toEqual({});
    expect(start.type).toBe(AuthActions.AUTH_RESET);
    expect(state).toEqual(INITIAL_STATE);
  });

  it('auth reset message action', () => {
    const start = resetMessage();
    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.type).toBe(AuthActions.AUTH_RESET_MESSAGE);
    expect(start.payload).toEqual({});
    expect(state.isAuthenticated).toBe(false);
  });

  it('get role', () => {
    const { role } = getTokenRole(process.env.TEST_TOKEN as string);

    store.dispatch(loginSuccess(true, role, process.env.TEST_TOKEN as string));

    expect(role).toEqual({ id: 1, type: 'user' });
  });

  it('make store', () => {
    const ctx = jest.fn() as Context;
    const newStore = makeStore(ctx);

    expect(newStore).toEqual(store);
  });
});
