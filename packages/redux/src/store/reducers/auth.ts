import {
  AuthActions,
  AuthActionTypes,
  AuthTouched,
  AuthValues,
  Role,
} from '../types/auth';

export interface AuthState {
  errors: AuthValues;
  values: AuthValues;
  message: string;
  status: number | null;
  touched: AuthTouched;
  role: Role | null;
  isAuthenticated: boolean;
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

export const INITIAL_STATE: AuthState = {
  errors: values,
  values,
  touched,
  message: '',
  status: null,
  role: null,
  isAuthenticated: false,
};

export function AuthReducer(
  prevState = INITIAL_STATE,
  action: AuthActionTypes
) {
  switch (action.type) {
    case AuthActions.AUTH_RESET:
      if (action.payload.clearAll) {
        return { ...INITIAL_STATE };
      }
      return {
        ...INITIAL_STATE,
        role: prevState.role,
        isAuthenticated: prevState.isAuthenticated,
      };
    case AuthActions.AUTH_RESET_MESSAGE:
      return { ...prevState, message: '', status: null };
    case AuthActions.AUTH_START:
      return {
        ...INITIAL_STATE,
        values: { ...INITIAL_STATE.values, ...action.payload.values },
      };
    case AuthActions.AUTH_SUCCESS:
      return { ...INITIAL_STATE, ...action.payload };
    case AuthActions.AUTH_FAILED: {
      const { message, status, errors, refresh } = action.payload;
      return {
        ...prevState,
        message: message || '',
        status,
        errors: errors
          ? { ...prevState.errors, ...errors }
          : INITIAL_STATE.errors,
        touched: !refresh
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
      };
    }
    case AuthActions.LOGIN_SUCCESS:
      return { ...prevState, ...action.payload };
    default:
      return prevState;
  }
}
