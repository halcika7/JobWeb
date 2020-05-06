import store from '@store/index';
import { CountryActions } from '../../../util/country/types';

describe('Testing reducer', () => {
  it('should return success', () => {
    store.dispatch({
      type: CountryActions.COUNTRY_SUCCESS,
      payload: { countries: [{ value: 'BIH', label: 'BIH' }], cities: [] },
    });

    expect(store.getState().country.countries.length).toBe(1);
  });
});
