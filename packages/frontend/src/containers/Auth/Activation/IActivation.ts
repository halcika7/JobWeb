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
  activateAccount as activateAccountAction,
  resendActivationLink as resendActivationLinkAction,
} from '@containers/Auth/store/actions';

export interface DispatchToProps extends AuthDispatchToProps {
  activateAccount: () => void;
  resendActivationLink: (email: string) => void;
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
  activateAccount: () => activateAccountAction(dispatch),
  resendActivationLink: (email: string) =>
    dispatch(resendActivationLinkAction(email)),
  ...authMapDispatchToProps(dispatch, ownProps),
});
