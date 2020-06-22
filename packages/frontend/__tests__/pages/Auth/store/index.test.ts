import { makeStore, store, Context, Types, Actions } from '@job/redux';
// TODO
import { AuthReducer, INITIAL_STATE } from '@containers/Auth/store/reducer';

describe('Auth actions testing', () => {
  it('auth start action', () => {
    const start = Actions.authStart({
      username: 'halcika',
      password: 'sdasdas',
    });

    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.payload).toEqual({
      values: { username: 'halcika', password: 'sdasdas' },
    });
    expect(start.type).toBe(Types.AuthActions.AUTH_START);
    expect(state.values.username).toBe('halcika');
  });

  it('auth failed action without message', () => {
    const start = Actions.authFailed({
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
    expect(start.type).toBe(Types.AuthActions.AUTH_FAILED);
    expect(state.status).toBe(200);
  });

  it('auth failed action for refresh', () => {
    const start = Actions.authFailed({
      status: 200,
      refresh: true,
    });

    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.payload).toEqual({
      status: 200,
      refresh: true,
    });
    expect(start.type).toBe(Types.AuthActions.AUTH_FAILED);
    expect(state.status).toBe(200);
  });

  it('auth reset action', () => {
    const start = Actions.authReset();

    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.payload).toEqual({});
    expect(start.type).toBe(Types.AuthActions.AUTH_RESET);
    expect(state).toEqual(INITIAL_STATE);
  });

  it('auth reset message action', () => {
    const start = Actions.resetMessage();
    const state = AuthReducer(INITIAL_STATE, start);

    expect(start.type).toBe(Types.AuthActions.AUTH_RESET_MESSAGE);
    expect(start.payload).toEqual({});
    expect(state.isAuthenticated).toBe(false);
  });

  it('get role', () => {
    const { role } = Actions.getTokenRole(process.env.TEST_TOKEN as string);

    store.dispatch(Actions.loginSuccess(true, role));

    expect(role).toEqual({ id: 1, type: 'user' });
  });

  it('make store', () => {
    const ctx = jest.fn() as Context;
    const newStore = makeStore(ctx);

    expect(newStore).toEqual(store);
  });
});
