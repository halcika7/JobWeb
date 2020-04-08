import { AppThunkDispatch } from 'store/AppThunkDispatch';
import axios from 'util/axios';
import { AccountRegistrationType } from '../IRegister';
import {
  RegisterActions,
  RegisterActionTypes,
  RegisterValues,
} from './RegisterActionTypes';

type Failed = { message?: string; status: number; errors?: RegisterValues };

const registerStart = (values: RegisterValues): RegisterActionTypes => ({
  type: RegisterActions.REGISTER_START,
  payload: { values },
});

const registerSuccess = (
  message: string,
  status: number
): RegisterActionTypes => ({
  type: RegisterActions.REGISTER_SUCCESS,
  payload: { message, status },
});

const registerFailed = (obj: Failed): RegisterActionTypes => ({
  type: RegisterActions.REGISTER_FAILED,
  payload: { ...obj },
});

export const registerReset = (): RegisterActionTypes => ({
  type: RegisterActions.REGISTER_RESET,
  payload: {},
});

export const registerUser = (
  userData: RegisterValues,
  acccountType: AccountRegistrationType
) => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(registerStart(userData));
  const { data, status } = await axios.post('/auth/', {
    userData,
    acccountType,
  });

  if (status === 200) {
    dispatch(registerSuccess(data.message, status));
  } else {
    dispatch(registerFailed({ ...data, status }));
  }
};
