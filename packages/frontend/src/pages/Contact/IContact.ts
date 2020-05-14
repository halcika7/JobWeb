import { ContactMessage } from './store/types';
import { ContactMessageState } from './store/reducer';
// types
import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from '@store/AppThunkDispatch';
import { AppState } from '@store/RootReducer';

import {
  resetMessages as resetMessageAction,
  resetState as resetStateAction,
  postNewMessage as postNewMessageAction
} from './store/actions';

export interface DispatchToProps {
  resetMessage: () => void;
  resetState: () => void;
  postMessage: (messageData: ContactMessage) => void;
}

export type Props = ContactMessageState & DispatchToProps & {};

export const mapStateToProps: MapStateToProps<
  ContactMessageState,
  {},
  AppState
> = (state: AppState, ownProps: {}): ContactMessageState => ({
  message: state.contact.message,
  status: state.contact.status,
  errors: state.contact.errors,
  values: state.contact.values,
  touched: state.contact.touched,
  ...ownProps,
});

export const mapDispatchToProps: MapDispatchToProps<DispatchToProps, {}> = (
  dispatch: AppThunkDispatch,
  _: {}
): DispatchToProps => ({
  resetMessage: () => dispatch(resetMessageAction()),
  resetState: () => dispatch(resetStateAction()),
  postMessage: async (messageData) => dispatch(postNewMessageAction(messageData))
});
