import { store, Actions } from '@job/redux';

describe('Testing Contact reducer', () => {
  it('should dispatch failed message attempt', () => {
    store.dispatch(
      Actions.contactMessageFailed({ status: 400, message: 'askaosd' })
    );

    expect(store.getState().contact.status).toBe(400);
    expect(store.getState().contact.message).toBe('askaosd');

    store.dispatch(
      Actions.contactMessageFailed({
        status: 400,
        errors: {
          email: 'email is required',
          message: '',
          name: '',
          subject: '',
          phone: '',
        },
      })
    );

    expect(store.getState().contact.status).toBe(400);
    expect(store.getState().contact.errors).toEqual({
      email: 'email is required',
      message: '',
      name: '',
      subject: '',
      phone: '',
    });
  });
});
