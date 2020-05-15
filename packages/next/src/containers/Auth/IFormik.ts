import { AuthTouched, AuthValues } from '@containers/Auth/store/types';

export interface FormikProps {
  errors: AuthValues;
  values: AuthValues;
  touched: AuthTouched;
  status: number | null;
  buttonDisabled: boolean;
}
