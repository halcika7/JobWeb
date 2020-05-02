import axios from '@axios';

import { AppThunkDispatch } from '@store/AppThunkDispatch';

import { CountryActions, CountryActionTypes } from './types';

export const getCountries = async (
  dispatch: AppThunkDispatch
): Promise<CountryActionTypes> => {
  const { data } = await axios.get('/country/');

  return dispatch({
    type: CountryActions.COUNTRY_SUCCESS,
    payload: { ...data },
  });
};
