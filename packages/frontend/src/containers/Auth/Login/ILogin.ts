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

interface StateToProps extends AuthStateToProps {
  isAuthenticated: boolean;
}

interface DispatchToProps extends AuthDispatchToProps {
  loginUser: (loginData: LoginData) => void;
}

export type Props = StateToProps & DispatchToProps & {};

export const mapStateToProps: MapStateToProps<StateToProps, {}, AppState> = (
  state: AppState,
  ownProps: {}
): StateToProps => ({
  ...authMapStateToProps(state, ownProps),
  isAuthenticated: state.auth.isAuthenticated,
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
