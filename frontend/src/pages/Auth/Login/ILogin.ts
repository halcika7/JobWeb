// types
import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from '@store/AppThunkDispatch';
import { AppState } from '@store/RootReducer';
import {
  AuthDispatchToProps,
  authMapDispatchToProps,
  authMapStateToProps,
  AuthStateToProps,
} from '@pages/Auth/IAuth';
import { LoginData } from '@pages/Auth/store/types';

// actions
import {
  loginUser as loginUserAction,
  resetMessage as resetMessageAction,
} from '@pages/Auth/store/actions';

interface DispatchToProps extends AuthDispatchToProps {
  loginUser: (loginData: LoginData) => void;
  resetMessages: () => void;
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
  resetMessages: () => dispatch(resetMessageAction()),
  loginUser: async (loginData: LoginData) =>
    dispatch(loginUserAction(loginData)),
  ...authMapDispatchToProps(dispatch, ownProps),
});
