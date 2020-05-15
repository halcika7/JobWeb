import axios from '@axios';
import moxios from 'moxios';
import { getCountries } from '../../../src/util/country/actions';

describe('Testing country actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should succeed', async done => {
    const dispatch = jest.fn();
    moxios.withMock(() => {
      getCountries(dispatch);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              countries: [],
              cities: [],
            },
          })
          .then(() => {
            expect(req.url).toBe('/country/');
            done();
          });
      });
    });
  });
});
