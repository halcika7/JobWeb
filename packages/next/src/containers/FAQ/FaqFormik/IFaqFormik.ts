// types
import { ContactMessageTouched } from '@containers/Contact/store/reducer';
import { ContactMessage } from '@containers/Contact/store/types';

import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppThunkDispatch } from '@store/AppThunkDispatch';
import { AppState } from '@store/RootReducer';

import { postNewMessage as postNewMessageAction } from '@containers/Contact/store/actions';

import { Input } from '@components/UI/input/Input';

type ValidNameValues = 'name' | 'email' | 'phone' | 'subject';

interface ContactInput extends Input {
  name: ValidNameValues;
}

export const inputs: ContactInput[] = [
  {
    classNames: 'form-group col-12',
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    classNames: 'form-group col-12',
    label: 'Subject',
    name: 'subject',
    type: 'text',
    required: true,
  },
  {
    classNames: 'form-group col-12',
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    classNames: 'form-group col-12',
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    required: false,
  },
];

export interface OwnProps {
  status: number | null;
  disabled: boolean;
}

export interface StateToProps {
  errors: ContactMessage;
  values: ContactMessage;
  touched: ContactMessageTouched;
}

export interface DispatchToProps {
  postMessage: (messageData: ContactMessage) => void;
}

export type Props = StateToProps & DispatchToProps & OwnProps;

export const mapStateToProps: MapStateToProps<
  StateToProps,
  OwnProps,
  AppState
> = (state: AppState, ownProps: OwnProps): StateToProps => ({
  errors: state.contact.errors,
  values: state.contact.values,
  touched: state.contact.touched,
  ...ownProps,
});

export const mapDispatchToProps: MapDispatchToProps<DispatchToProps, {}> = (
  dispatch: AppThunkDispatch,
  _: {}
): DispatchToProps => ({
  postMessage: async messageData => dispatch(postNewMessageAction(messageData)),
});
