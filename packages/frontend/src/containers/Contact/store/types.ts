import { HTTPCodes } from '@job/common';

export type ContactFailed = { message?: string; status: HTTPCodes; errors?: ContactMessage };

export interface ContactMessage {
  message: string;
  email: string;
  name: string;
  subject: string;
  phone?: string;
}

export enum ContactActions {
  CONTACT_MESSAGE_START = 'CONTACT_MESSAGE_START',
  CONTACT_MESSAGE_SUCCESS = 'CONTACT_MESSAGE_SUCCESS',
  CONTACT_MESSAGE_FAILED = 'CONTACT_MESSAGE_FAILED',
  CONTACT_RESET_MESSAGE = 'CONTACT_RESET_MESSAGE',
  CONTACT_RESET_STATE = 'CONTACT_RESET_STATE',
}

interface ContactMessageStart {
  type: typeof ContactActions.CONTACT_MESSAGE_START;
  payload: { values: ContactMessage };
}

interface ContactMessageSuccess {
  type: typeof ContactActions.CONTACT_MESSAGE_SUCCESS;
  payload: { message: string; status: HTTPCodes };
}

interface ContactMessageFailed {
  type: typeof ContactActions.CONTACT_MESSAGE_FAILED;
  payload: ContactFailed;
}

interface ContactResetMessage {
  type: typeof ContactActions.CONTACT_RESET_MESSAGE;
  payload: {};
}

interface ContactResetState {
  type: typeof ContactActions.CONTACT_RESET_STATE;
  payload: {};
}

export type ContactActionTypes =
  | ContactMessageStart
  | ContactMessageSuccess
  | ContactMessageFailed
  | ContactResetMessage
  | ContactResetState;
