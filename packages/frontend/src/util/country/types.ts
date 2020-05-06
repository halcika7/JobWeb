export type Select = {
  value: string;
  label: string;
};

export type SelectCities = {
  [key: string]: Select[];
};

// types
export enum CountryActions {
  COUNTRY_SUCCESS = 'COUNTRY_SUCCESS',
  COUNTRY_FAILED = 'COUNTRY_FAILED',
}

interface CountrySuccess {
  type: typeof CountryActions.COUNTRY_SUCCESS;
  payload: { countries: Select[]; cities: SelectCities };
}

interface CountryFailed {
  type: typeof CountryActions.COUNTRY_FAILED;
  payload: { message: string; status: number };
}

export type CountryActionTypes = CountrySuccess | CountryFailed;
