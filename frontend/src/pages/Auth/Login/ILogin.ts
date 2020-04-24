// types
import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from 'store/AppThunkDispatch';
import { AppState } from 'store/RootReducer';
import {
  AuthDispatchToProps,
  authMapDispatchToProps,
  authMapStateToProps,
  AuthStateToProps,
} from '../IAuth';
import { LoginData } from '../store/types';

// actions
import { loginUser as loginUserAction } from '../store/actions';

interface DispatchToProps extends AuthDispatchToProps {
  loginUser: (loginData: LoginData) => void;
}

export type Props = AuthStateToProps & DispatchToProps & {};

export const mapStateToProps: MapStateToProps<
  AuthStateToProps,
  {},
  AppState
> = (state: AppState, ownProps: {}): AuthStateToProps => ({
  ...authMapStateToProps(state, ownProps),
  ...ownProps,
});

export const mapDispatchToProps: MapDispatchToProps<DispatchToProps, {}> = (
  dispatch: AppThunkDispatch,
  ownProps: {}
): DispatchToProps => ({
  loginUser: async (loginData: LoginData) =>
    dispatch(loginUserAction(loginData)),
  ...authMapDispatchToProps(dispatch, ownProps),
});
