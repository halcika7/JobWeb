export type RegisterValues = {
  username: string;
  email: string;
  password: string;
  password2: string;
  phone: string;
  country: string;
  city: string;
  web: string;
  company: string;
}

export type RegisterTouched = {
  username: boolean;
  email: boolean;
  password: boolean;
  password2: boolean;
  phone: boolean;
  country: boolean;
  city: boolean;
  web: boolean;
  company: boolean;
}

export enum RegisterActions {
  REGISTER_START = 'REGISTER_START',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILED = 'REGISTER_FAILED',
  REGISTER_RESET = 'REGISTER_RESET',
}

interface RegisterStart {
  type: typeof RegisterActions.REGISTER_START;
  payload: { values: RegisterValues };
}

interface RegisterSuccess {
  type: typeof RegisterActions.REGISTER_SUCCESS;
  payload: { message: string; status: number };
}

interface RegisterFailed {
  type: typeof RegisterActions.REGISTER_FAILED;
  payload: { message?: string; status: number; errors?: RegisterValues };
}

interface RegisterReset {
  type: typeof RegisterActions.REGISTER_RESET;
  payload: {};
}

export type RegisterActionTypes =
  | RegisterSuccess
  | RegisterFailed
  | RegisterStart
  | RegisterReset;
