// types
import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from '@store/AppThunkDispatch';
import { AppState } from '@store/RootReducer';
import {
  AuthDispatchToProps,
  authMapDispatchToProps,
  authMapStateToProps,
  AuthStateToProps,
} from '@containers/Auth/IAuth';
import { LoginData } from '@containers/Auth/store/types';

// actions
import { loginUser as loginUserAction } from '@containers/Auth/store/actions';

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
  ...ownProps,
  ...authMapDispatchToProps(dispatch, ownProps),
});
