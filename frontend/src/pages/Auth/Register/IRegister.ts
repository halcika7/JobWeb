import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from 'store/AppThunkDispatch';
import { getCountries as getCountriesAction } from 'store/country/CountryActions';
import { Select, SelectCities } from 'store/country/CountryActionTypes';
import { AppState } from 'store/RootReducer';
import {
  registerReset as registerResetAction,
  registerUser as registerUserAction,
} from './store/RegisterActions';
import { RegisterTouched, RegisterValues } from './store/RegisterActionTypes';

export type AccountRegistrationType = 'user' | 'company';

export interface DispatchToProps {
  getCountries: () => void;
  registerUser: (
    userData: RegisterValues,
    acccountType: AccountRegistrationType
  ) => void;
  registerReset: () => void;
}

export interface StateToProps {
  countries: Select[];
  cities: SelectCities;
  errors: RegisterValues;
  values: RegisterValues;
  touched: RegisterTouched;
  message: string;
  status: number | null;
}

export type Props = StateToProps & DispatchToProps & {};

export const mapStateToProps: MapStateToProps<StateToProps, {}, AppState> = (
  state: AppState,
  ownProps: {}
): StateToProps => ({
  countries: state.country.countries,
  cities: state.country.cities,
  errors: state.register.errors,
  values: state.register.values,
  touched: state.register.touched,
  message: state.register.message,
  status: state.register.status,
  ...ownProps,
});

export const mapDispatchToProps: MapDispatchToProps<DispatchToProps, {}> = (
  dispatch: AppThunkDispatch,
  ownProps: {}
): DispatchToProps => ({
  getCountries: async () => dispatch(getCountriesAction()),
  registerUser: async (
    userData: RegisterValues,
    acccountType: AccountRegistrationType
  ) => dispatch(registerUserAction(userData, acccountType)),
  registerReset: () => dispatch(registerResetAction()),
});
