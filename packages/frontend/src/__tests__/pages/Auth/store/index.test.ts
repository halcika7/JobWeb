import {
  authStart,
  authFailed,
  authReset,
  authSuccess,
  loginSuccess,
  getTokenRole,
  resetMessage,
} from '@pages/Auth/store/actions';
import { AuthReducer, INITIAL_STATE } from '@pages/Auth/store/reducer';
import { AuthActions } from '@pages/Auth/store/types';

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

  it('auth success action', () => {
    const start = authSuccess('some', 200);

    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.payload).toEqual({ message: 'some', status: 200 });
    expect(start.type).toBe(AuthActions.AUTH_SUCCESS);
    expect(state.message).toBe('some');
    expect(state.status).toBe(200);
  });

  it('auth failed action', () => {
    const start = authFailed({
      status: 200,
      limit: 'some',
      errors: { ...INITIAL_STATE.errors, city: 'is required' },
      message: 'some',
    });

    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.payload).toEqual({
      message: 'some',
      status: 200,
      limit: 'some',
      errors: { ...INITIAL_STATE.errors, city: 'is required' },
    });
    expect(start.type).toBe(AuthActions.AUTH_FAILED);
    expect(state.message).toBe('some');
    expect(state.status).toBe(200);
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

  it('auth login success action', () => {
    const start = loginSuccess(true, { id: 1, type: 'user' }, 'sjdiosjaodji');
    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.type).toBe(AuthActions.LOGIN_SUCCESS);
    expect(state.isAuthenticated).toBe(true);
  });

  it('auth reset message action', () => {
    const start = resetMessage();
    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.type).toBe(AuthActions.AUTH_RESET_MESSAGE);
    expect(start.payload).toEqual({});
    expect(state.isAuthenticated).toBe(false);
  });

  it('get role', () => {
    const { role } = getTokenRole(process.env.REACT_APP_TEST_TOKEN as string);

    expect(role).toEqual({ id: 1, type: 'user' });
  });
});
