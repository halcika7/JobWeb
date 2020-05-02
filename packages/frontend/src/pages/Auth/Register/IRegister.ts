// types
import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from '@store/AppThunkDispatch';
import { Select, SelectCities } from '@country/types';
import { AccountRegistrationType, AuthValues } from '../store/types';
import { AppState } from '@store/RootReducer';

import {
  AuthDispatchToProps,
  authMapDispatchToProps,
  authMapStateToProps,
  AuthStateToProps,
} from '../IAuth';

import { registerUser as registerUserAction } from '../store/actions';

export interface DispatchToProps extends AuthDispatchToProps {
  registerUser: (
    userData: AuthValues,
    accountType: AccountRegistrationType
  ) => void;
}

export interface StateToProps extends AuthStateToProps {
  countries: Select[];
  cities: SelectCities;
}

export type Props = StateToProps & DispatchToProps & {};

export const mapStateToProps: MapStateToProps<StateToProps, {}, AppState> = (
  state: AppState,
  ownProps: {}
): StateToProps => ({
  countries: state.country.countries,
  cities: state.country.cities,
  ...authMapStateToProps(state, ownProps),
  ...ownProps,
});

export const mapDispatchToProps: MapDispatchToProps<DispatchToProps, {}> = (
  dispatch: AppThunkDispatch,
  ownProps: {}
): DispatchToProps => ({
  registerUser: async (
    userData: AuthValues,
    accountType: AccountRegistrationType
  ) => dispatch(registerUserAction({ userData, accountType })),
  ...authMapDispatchToProps(dispatch, ownProps),
});
