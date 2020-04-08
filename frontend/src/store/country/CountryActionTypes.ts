export type Select = {
  value: string;
  label: string;
}

export type SelectCities = {
  [key: string]: Select[];
}

export enum CountryActions {
  COUNTRY_START = 'COUNTRY_START',
  COUNTRY_SUCCESS = 'COUNTRY_SUCCESS',
  COUNTRY_FAILED = 'COUNTRY_FAILED',
}

interface CountryStart {
  type: typeof CountryActions.COUNTRY_START;
  payload: {};
}

interface CountrySuccess {
  type: typeof CountryActions.COUNTRY_SUCCESS;
  payload: { countries: Select[]; cities: SelectCities };
}

interface CountryFailed {
  type: typeof CountryActions.COUNTRY_FAILED;
  payload: { message: string; sattus: number };
}

export type CountryActionTypes = CountryStart | CountrySuccess | CountryFailed;
