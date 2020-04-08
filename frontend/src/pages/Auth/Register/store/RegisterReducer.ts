import {
  RegisterActions,
  RegisterActionTypes,
  RegisterTouched,
  RegisterValues,
} from './RegisterActionTypes';

export interface RegisterState {
  errors: RegisterValues;
  values: RegisterValues;
  message: string;
  status: number | null;
  touched: RegisterTouched;
}

const initialValues = {
  username: '',
  email: '',
  password: '',
  password2: '',
  country: '',
  city: '',
  phone: '',
  web: '',
  company: '',
};

const touchedFileds = {
  username: false,
  email: false,
  password: false,
  password2: false,
  country: false,
  city: false,
  phone: false,
  web: false,
  company: false,
};

const INITIAL_STATE: RegisterState = {
  errors: initialValues,
  values: initialValues,
  touched: touchedFileds,
  message: '',
  status: null,
};

export function RegisterReducer(
  prevState = INITIAL_STATE,
  action: RegisterActionTypes
) {
  switch (action.type) {
    case RegisterActions.REGISTER_RESET:
      return { ...INITIAL_STATE };
    case RegisterActions.REGISTER_START:
      return {
        ...INITIAL_STATE,
        values: { ...action.payload.values, country: '', city: '' },
      };
    case RegisterActions.REGISTER_SUCCESS:
      return {
        ...INITIAL_STATE,
        message: action.payload.message,
        status: action.payload.status,
      };
    case RegisterActions.REGISTER_FAILED:
      return {
        ...prevState,
        message: action.payload.message || '',
        status: action.payload.status,
        errors: action.payload.errors || {},
        touched: {
          username: true,
          email: true,
          password: true,
          password2: true,
          country: true,
          city: true,
          phone: true,
          web: true,
          company: true,
        },
      };
    default:
      return prevState;
  }
}
