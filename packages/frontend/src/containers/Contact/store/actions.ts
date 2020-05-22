import axios from '@axios';
import { HTTPCodes } from '@job/common';
import {
  ContactMessage,
  ContactActionTypes,
  ContactActions,
  ContactFailed,
} from './types';
import { AppThunkDispatch } from '@store/AppThunkDispatch';

const contactMessageStart = (values: ContactMessage): ContactActionTypes => ({
  type: ContactActions.CONTACT_MESSAGE_START,
  payload: { values },
});

export const contactMessageSuccess = (
  message: string,
  status: number
): ContactActionTypes => ({
  type: ContactActions.CONTACT_MESSAGE_SUCCESS,
  payload: { message, status },
});

export const contactMessageFailed = (obj: ContactFailed): ContactActionTypes => ({
  type: ContactActions.CONTACT_MESSAGE_FAILED,
  payload: { ...obj },
});

export const postNewMessage = (messageData: ContactMessage) => async (
  dispatch: AppThunkDispatch
): Promise<ContactActionTypes> => {
  dispatch(contactMessageStart(messageData));

  const { data, status } = await axios.post<{
    message: string;
    errors?: any;
  }>('/contact/', messageData);

  if (status === HTTPCodes.Created) {
    return dispatch(contactMessageSuccess(data.message, status));
  }

  return dispatch(contactMessageFailed({ ...data, status }));
};

export const resetMessages = () => ({
  type: ContactActions.CONTACT_RESET_MESSAGE,
  payload: {},
});

export const resetState = () => ({
  type: ContactActions.CONTACT_RESET_STATE,
  payload: {},
});
