export type AccountRegistrationType = 'user' | 'company';

export type AuthValues = {
  username: string;
  email: string;
  password: string;
  password2: string;
  phone: string;
  country: string;
  city: string;
  website: string;
  company: string;
};

export type AuthTouched = {
  username: boolean;
  email: boolean;
  password: boolean;
  password2: boolean;
  phone: boolean;
  country: boolean;
  city: boolean;
  website: boolean;
  company: boolean;
};

export type AuthPostData = {
  userData: AuthValues;
  accountType?: AccountRegistrationType;
};

export type LoginData = {
  username: string;
  password: string;
};

export type Failed = {
  message?: string;
  status: number;
  errors?: AuthValues;
  refresh?: boolean;
  limit?: string;
};

export interface Role {
  id: number;
  type: 'user' | 'company' | 'worker' | 'admin';
}

export enum AuthActions {
  AUTH_START = 'AUTH_START',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILED = 'AUTH_FAILED',
  AUTH_RESET = 'AUTH_RESET',
  AUTH_RESET_MESSAGE = 'AUTH_RESET_MESSAGE',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
}

interface AuthStart {
  type: typeof AuthActions.AUTH_START;
  payload: { values: AuthValues | LoginData };
}

interface AuthSuccess {
  type: typeof AuthActions.AUTH_SUCCESS;
  payload: { message: string; status: number };
}

interface AuthFailed {
  type: typeof AuthActions.AUTH_FAILED;
  payload: Failed;
}

interface AuthReset {
  type: typeof AuthActions.AUTH_RESET;
  payload: {};
}

interface AuthResetMessage {
  type: typeof AuthActions.AUTH_RESET_MESSAGE;
  payload: {};
}

interface LoginSuccess {
  type: typeof AuthActions.LOGIN_SUCCESS;
  payload: { isAuthenticated: boolean; token: string; role: Role };
}

export type AuthActionTypes =
  | AuthSuccess
  | AuthFailed
  | AuthStart
  | AuthReset
  | AuthResetMessage
  | LoginSuccess;
