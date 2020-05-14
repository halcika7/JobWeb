// types
import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from '@store/AppThunkDispatch';
import { AppState } from '@store/RootReducer';

import {
  resetMessages as resetMessageAction,
  resetState as resetStateAction,
} from '@pages/Contact/store/actions';

export interface StateToProps {
  message: string;
  status: number | null;
}

export interface DispatchToProps {
  resetMessage: () => void;
  resetState: () => void;
}

export type Props = StateToProps & DispatchToProps & {};

export const mapStateToProps: MapStateToProps<
  StateToProps,
  {},
  AppState
> = (state: AppState, ownProps: {}): StateToProps => ({
  message: state.contact.message,
  status: state.contact.status,
  ...ownProps,
});

export const mapDispatchToProps: MapDispatchToProps<DispatchToProps, {}> = (
  dispatch: AppThunkDispatch,
  _: {}
): DispatchToProps => ({
  resetMessage: () => dispatch(resetMessageAction()),
  resetState: () => dispatch(resetStateAction())
});
