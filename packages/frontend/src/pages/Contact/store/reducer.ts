import { ContactMessage, ContactActionTypes, ContactActions } from './types';

export interface ContactMessageTouched {
  message: boolean;
  email: boolean;
  name: boolean;
  subject: boolean;
  phone?: boolean;
}

export interface ContactMessageState {
  errors: ContactMessage;
  values: ContactMessage;
  message: string;
  status: number | null;
  touched: ContactMessageTouched;
}

const values = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const touched = {
  name: false,
  email: false,
  phone: false,
  subject: false,
  message: false,
};

export const INITIAL_STATE: ContactMessageState = {
  errors: values,
  values,
  touched,
  message: '',
  status: null,
};

export function ContactReducer(
  prevState = INITIAL_STATE,
  action: ContactActionTypes
) {
  switch (action.type) {
    case ContactActions.CONTACT_RESET_STATE:
      return { ...INITIAL_STATE };
    case ContactActions.CONTACT_RESET_MESSAGE:
      return { ...prevState, message: '', status: null };
    case ContactActions.CONTACT_MESSAGE_START:
      return {
        ...INITIAL_STATE,
        values: { ...INITIAL_STATE.values, ...action.payload.values },
      };
    case ContactActions.CONTACT_MESSAGE_SUCCESS:
      return {
        ...INITIAL_STATE,
        message: action.payload.message,
        status: action.payload.status,
      };
    case ContactActions.CONTACT_MESSAGE_FAILED:
      return {
        ...prevState,
        message: action.payload.message || '',
        status: action.payload.status,
        errors: action.payload.errors
          ? { ...prevState.errors, ...action.payload.errors }
          : INITIAL_STATE.errors,
        touched: {
          name: true,
          email: true,
          phone: true,
          subject: true,
          message: true,
        },
      };
    default:
      return prevState;
  }
}
