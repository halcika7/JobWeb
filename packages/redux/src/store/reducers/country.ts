import {
  CountryActions,
  CountryActionTypes,
  Select,
  SelectCities,
} from '../types/country';

export type CountryState = {
  countries: Select[];
  cities: SelectCities;
  message: string;
  status: number | null;
};

const INITIAL_STATE: CountryState = {
  countries: [],
  cities: {},
  message: '',
  status: null,
};

export function CountryReducer(
  prevState = INITIAL_STATE,
  action: CountryActionTypes
): CountryState {
  switch (action.type) {
    case CountryActions.COUNTRY_SUCCESS:
      return { ...INITIAL_STATE, ...action.payload };
    default:
      return prevState;
  }
}
