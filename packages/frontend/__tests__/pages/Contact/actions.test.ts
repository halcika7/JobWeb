import { axios, Actions } from '@job/redux';
import moxios from 'moxios';

describe('Testing Contact actions', () => {
  beforeEach(() => {
    moxios.install(axios.default);
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should succeed', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      dispatch(
        Actions.postNewMessage({
          email: 'email@gmail.com',
          message: 'anojfaids fasijfoaisj asfijaosss',
          name: 'name',
          subject: 'asjfdoijasdo',
        })
      );
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
      dispatch(
        Actions.postNewMessage({
          email: '',
          message: '',
          name: '',
          subject: '',
        })
      );
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
