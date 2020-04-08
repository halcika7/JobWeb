import { AppThunkDispatch } from 'store/AppThunkDispatch';
import axios from 'util/axios';
import { CountryActions } from './CountryActionTypes';

export const getCountries = () => async (
  dispatch: AppThunkDispatch
): Promise<void> => {
  const { data } = await axios.get('/country/');
  if (data.error) {
  } else
    dispatch({
      type: CountryActions.COUNTRY_SUCCESS,
      payload: { ...data },
    });
};
