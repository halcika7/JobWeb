import axios from '@axios';
import moxios from 'moxios';
import {
  refreshToken,
  logoutUser,
  loginUser,
  registerUser,
} from '@containers/Auth/store/actions';

describe('testing success refresh', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should succeed', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      refreshToken(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              accessToken: process.env.TEST_TOKEN as string,
            },
          })
          .then(() => {
            expect(req.url).toBe('/auth/refresh');
            done();
          });
      });
    });
  });

  it('should fail', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      refreshToken(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: {},
          })
          .then(() => {
            expect(req.url).toBe('/auth/refresh');
            done();
          });
      });
    });
  });
});

describe('testing success logout', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should succeed', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      logoutUser(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {},
          })
          .then(() => {
            expect(req.url).toBe('/auth/logout');
            done();
          });
      });
    });
  });

  it('should fail', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      logoutUser(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: {},
          })
          .then(() => {
            expect(req.url).toBe('/auth/logout');
            done();
          });
      });
    });
  });
});

describe('testing success login', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should succeed', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      loginUser({ username: 'halcika', password: '1234567890' })(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              message: 'success',
              accessToken: process.env.TEST_TOKEN as string,
            },
          })
          .then(() => {
            expect(req.url).toBe('/auth/login');
            done();
          });
      });
    });
  });

  it('should fail', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      loginUser({ username: 'halcika', password: '1234567890' })(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: {},
          })
          .then(() => {
            expect(req.url).toBe('/auth/login');
            done();
          });
      });
    });
  });
});

describe('testing success login', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should succeed', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      registerUser({
        userData: {
          city: 'some city',
          country: 'country',
          email: 'email@gmail.com',
          password: '@!Vv1234567890',
          password2: '@!Vv1234567890',
          phone: '+38761111111',
          username: 'username',
          company: '',
          website: '',
        },
        accountType: 'user',
      })(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              message: 'success',
            },
          })
          .then(() => {
            expect(req.url).toBe('/auth/');
            done();
          });
      });
    });
  });

  it('should fail', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      registerUser({
        userData: {
          city: 'some city',
          country: 'country',
          email: 'email@gmail.com',
          password: '@!Vv1234567890',
          password2: '@!Vv1234567890',
          phone: '+38761111111',
          username: 'username',
          company: '',
          website: '',
        },
        accountType: 'user',
      })(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: {
              message: 'success',
            },
          })
          .then(() => {
            expect(req.url).toBe('/auth/');
            done();
          });
      });
    });
  });
});
