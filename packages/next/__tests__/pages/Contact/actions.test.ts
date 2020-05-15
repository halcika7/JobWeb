import axios from '@axios';
import moxios from 'moxios';

import { postNewMessage } from '@containers/Contact/store/actions';

describe('Testing Contact actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should succeed', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      postNewMessage({
        email: 'email@gmail.com',
        message: 'anojfaids fasijfoaisj asfijaosss',
        name: 'name',
        subject: 'asjfdoijasdo',
      })(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 201,
            response: {
              message: 'kdfpokdspfo',
            },
          })
          .then(() => {
            expect(req.url).toBe('/contact/');
            done();
          });
      });
    });
  });

  it('should fail', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      postNewMessage({
        email: '',
        message: '',
        name: '',
        subject: '',
      })(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: {
              message: 'akspsdkosa',
            },
          })
          .then(() => {
            expect(req.url).toBe('/contact/');
            done();
          });
      });
    });
  });
});
