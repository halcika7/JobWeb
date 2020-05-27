import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from '@store/AppThunkDispatch';
import { AppState } from '@store/RootReducer';
import {
  AuthDispatchToProps,
  authMapDispatchToProps,
  authMapStateToProps,
  AuthStateToProps,
} from '@containers/Auth/IAuth';

// actions
import {
  sendResetPasswordLink as sendResetPasswordLinkAction,
  resetPassword as resetPasswordAction,
} from '@containers/Auth/store/actions';

export interface DispatchToProps extends AuthDispatchToProps {
  sendResetPasswordLink: (email: string) => void;
  resetPassword: (password: string, password2: string) => void;
}

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
  sendResetPasswordLink: (email: string) =>
    dispatch(sendResetPasswordLinkAction(email)),
  resetPassword: (password: string, password2: string) =>
    dispatch(resetPasswordAction(password, password2)),
  ...authMapDispatchToProps(dispatch, ownProps),
});
