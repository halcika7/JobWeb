import { axios } from '../../axios';
import { AuthToken } from '../../decode';
import { HTTPCodes } from '@job/common';

// types
import { AppThunkDispatch } from '../AppThunkDispatch';
import {
  AuthActions,
  AuthActionTypes,
  AuthPostData,
  AuthValues,
  Failed,
  LoginData,
  Role,
} from '../types/auth';
import { CookieService } from '../../utils/cookie';
import { SessionStorage } from '../../utils/sessionStorage';

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

export const authReset = (all = false): AuthActionTypes => ({
  type: AuthActions.AUTH_RESET,
  payload: { clearAll: all },
});

export const loginSuccess = (
  isAuthenticated: boolean,
  role: Role
): AuthActionTypes => ({
  type: AuthActions.LOGIN_SUCCESS,
  payload: { isAuthenticated, role },
});

export const getTokenRole = (token: string): { role: Role } => {
  const role = AuthToken.getRole(token);
  return { role };
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
    CookieService.setToken(data.accessToken);

    dispatch(authSuccess(data.message, status));

    const { role } = getTokenRole(data.accessToken);

    return dispatch(loginSuccess(true, role));
  }

  CookieService.removeToken();

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
    CookieService.removeToken();
    return dispatch(authReset(true));
  }

  return dispatch(authFailed({ ...data, status }));
};

export const refreshToken = async (dispatch: AppThunkDispatch) => {
  const { data, status } = await axios.get<{
    message: string;
    accessToken: string;
  }>('/auth/refresh');

  if (data.accessToken) {
    CookieService.setToken(data.accessToken);

    const { role } = getTokenRole(data.accessToken);

    return dispatch(loginSuccess(true, role));
  }

  CookieService.removeToken();

  return dispatch(authFailed({ ...data, status, refresh: true }));
};

export const activateAccount = () => async (dispatch: AppThunkDispatch) => {
  const token = SessionStorage.getItem('activate');

  const { data, status } = await axios.patch<{ message: string }>('/auth/', {
    token,
  });

  SessionStorage.removeItem('activate');

  if (status === HTTPCodes.OK) {
    return dispatch(authSuccess(data.message, status));
  }

  return dispatch(authFailed({ ...data, status }));
};

export const resendActivationLink = (email: string) => async (
  dispatch: AppThunkDispatch
) => {
  dispatch(authStart({ email } as AuthValues));

  const { data, status } = await axios.patch<{
    message: string;
  }>('/auth/resend', { email });

  if (status === HTTPCodes.OK) {
    return dispatch(authSuccess(data.message, status));
  }

  return dispatch(authFailed({ ...data, status }));
};

export const sendResetPasswordLink = (email: string) => async (
  dispatch: AppThunkDispatch
) => {
  dispatch(authStart({ email } as AuthValues));

  const { data, status } = await axios.patch<{
    message: string;
  }>('/auth/resetlink', { email });

  if (status === HTTPCodes.OK) {
    return dispatch(authSuccess(data.message, status));
  }

  return dispatch(authFailed({ ...data, status }));
};

export const resetPassword = (password: string, password2: string) => async (
  dispatch: AppThunkDispatch
) => {
  const token = SessionStorage.getItem('resetpassword');

  dispatch(authStart({ password, password2 } as AuthValues));

  const { data, status } = await axios.patch<{
    message: string;
  }>('/auth/resetpassword', { password, password2, token });

  if (status === HTTPCodes.OK || status === HTTPCodes.UNAUTHORIZED) {
    SessionStorage.removeItem('resetpassword');
  }

  if (status === HTTPCodes.OK) {
    return dispatch(authSuccess(data.message, status));
  }

  return dispatch(authFailed({ ...data, status }));
};
