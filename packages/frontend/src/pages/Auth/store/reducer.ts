import {
  AuthActions,
  AuthActionTypes,
  AuthTouched,
  AuthValues,
  Role,
} from './types';

export interface AuthState {
  errors: AuthValues;
  values: AuthValues;
  message: string;
  status: number | null;
  touched: AuthTouched;
  token: string;
  role: Role | null;
  isAuthenticated: boolean;
  limit: string;
}

const values: AuthValues = {
  username: '',
  email: '',
  password: '',
  password2: '',
  country: '',
  city: '',
  phone: '',
  website: '',
  company: '',
};

const touched: AuthTouched = {
  username: false,
  email: false,
  password: false,
  password2: false,
  country: false,
  city: false,
  phone: false,
  website: false,
  company: false,
};

const INITIAL_STATE: AuthState = {
  errors: values,
  values,
  touched,
  message: '',
  status: null,
  token: '',
  role: null,
  isAuthenticated: false,
  limit: '',
};

export function AuthReducer(
  prevState = INITIAL_STATE,
  action: AuthActionTypes
) {
  switch (action.type) {
    case AuthActions.AUTH_RESET:
      return { ...INITIAL_STATE };
    case AuthActions.AUTH_RESET_MESSAGE:
      return { ...prevState, message: '', status: null };
    case AuthActions.AUTH_START:
      return {
        ...INITIAL_STATE,
        values: { ...INITIAL_STATE.values, ...action.payload.values },
      };
    case AuthActions.AUTH_SUCCESS:
      return {
        ...INITIAL_STATE,
        message: action.payload.message,
        status: action.payload.status,
      };
    case AuthActions.AUTH_FAILED:
      return {
        ...prevState,
        message: action.payload.message || '',
        status: action.payload.status,
        errors: action.payload.errors
          ? { ...prevState.errors, ...action.payload.errors }
          : INITIAL_STATE.errors,
        touched: !action.payload.refresh
          ? {
              username: true,
              email: true,
              password: true,
              password2: true,
              country: true,
              city: true,
              phone: true,
              website: true,
              company: true,
            }
          : { ...INITIAL_STATE.touched },
        limit: action.payload.limit || '',
      };
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...prevState,
        role: action.payload.role,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
      };
    default:
      return prevState;
  }
}
