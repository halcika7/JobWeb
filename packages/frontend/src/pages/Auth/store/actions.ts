import axios from '@axios';
import { TokenDecode } from '@shared/decode';
import { HTTPCodes } from '@job/common';

// types
import { AppThunkDispatch } from '@store/AppThunkDispatch';
import {
  AuthActions,
  AuthActionTypes,
  AuthPostData,
  AuthValues,
  Failed,
  LoginData,
  Role,
} from './types';

// utils
import { SessionStorage } from '@shared/sessionStorage';

export const authStart = (values: AuthValues | LoginData): AuthActionTypes => ({
  type: AuthActions.AUTH_START,
  payload: { values },
});

export const authSuccess = (
  message: string,
  status: number
): AuthActionTypes => ({
  type: AuthActions.AUTH_SUCCESS,
  payload: { message, status },
});

export const authFailed = (obj: Failed): AuthActionTypes => ({
  type: AuthActions.AUTH_FAILED,
  payload: { ...obj },
});

export const authReset = (): AuthActionTypes => ({
  type: AuthActions.AUTH_RESET,
  payload: {},
});

export const loginSuccess = (
  isAuthenticated: boolean,
  role: Role,
  token: string
): AuthActionTypes => ({
  type: AuthActions.LOGIN_SUCCESS,
  payload: { isAuthenticated, role, token },
});

export const getTokenRole = (token: string): { token: string; role: Role } => {
  const role = TokenDecode.getRole(token);
  return { token, role };
};

export const resetMessage = (): AuthActionTypes => ({
  type: AuthActions.AUTH_RESET_MESSAGE,
  payload: {},
});

export const registerUser = (postObject: AuthPostData) => async (
  dispatch: AppThunkDispatch
): Promise<AuthActionTypes> => {
  dispatch(authStart(postObject.userData));

  const { data, status } = await axios.post<{
    message: string;
    errors?: any;
  }>('/auth/', postObject);

  if (status === HTTPCodes.OK) {
    return dispatch(authSuccess(data.message, status));
  }

  return dispatch(authFailed({ ...data, status }));
};

export const loginUser = (loginData: LoginData) => async (
  dispatch: AppThunkDispatch
): Promise<AuthActionTypes> => {
  dispatch(authStart(loginData));

  const { data, status } = await axios.post<{
    message: string;
    accessToken: string;
  }>('/auth/login', { ...loginData });

  if (status === HTTPCodes.OK) {
    dispatch(authSuccess(data.message, status));

    const { role, token } = getTokenRole(data.accessToken);

    SessionStorage.setAuthenticated();

    return dispatch(loginSuccess(true, role, token));
  }

  return dispatch(authFailed({ ...data, status }));
};

export const logoutUser = async (
  dispatch: AppThunkDispatch
): Promise<AuthActionTypes> => {
  const { data, status } = await axios.post<{ message?: string }>(
    '/auth/logout',
    {}
  );

  if (status === HTTPCodes.OK) {
    SessionStorage.removeAuthenticated();
    return dispatch(authReset());
  }

  return dispatch(authFailed({ ...data, status }));
};

export const refreshToken = async (dispatch: AppThunkDispatch) => {
  const { data, status } = await axios.get<{
    message: string;
    accessToken: string;
  }>('/auth/refresh');
  
  if (data.accessToken) {
    const { role, token } = getTokenRole(data.accessToken);

    SessionStorage.setAuthenticated();

    return dispatch(loginSuccess(true, role, token));
  }

  SessionStorage.removeAuthenticated();

  return dispatch(authFailed({ ...data, status, refresh: true }));
};
