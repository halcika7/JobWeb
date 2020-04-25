// types
import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from '@store/AppThunkDispatch';
import { AppState } from '@store/RootReducer';
import { AuthTouched, AuthValues } from './store/types';

// actions
import { authReset as authResetAction } from './store/actions';

export interface AuthDispatchToProps {
  authReset: () => void;
}

export interface AuthStateToProps {
  errors: AuthValues;
  values: AuthValues;
  touched: AuthTouched;
  message: string;
  status: number | null;
  limit: string;
}

export const authMapStateToProps: MapStateToProps<
  AuthStateToProps,
  {},
  AppState
> = (state: AppState, ownProps: {}): AuthStateToProps => ({
  errors: state.auth.errors,
  values: state.auth.values,
  touched: state.auth.touched,
  message: state.auth.message,
  status: state.auth.status,
  limit: state.auth.limit,
  ...ownProps,
});

export const authMapDispatchToProps: MapDispatchToProps<any, {}> = (
  dispatch: AppThunkDispatch,
  ownProps: {}
) => ({
  authReset: () => dispatch(authResetAction()),
});
