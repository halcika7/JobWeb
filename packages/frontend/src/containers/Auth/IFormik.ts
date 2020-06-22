import { Types } from '@job/redux';

export interface FormikProps {
  errors: Types.AuthValues;
  values: Types.AuthValues;
  touched: Types.AuthTouched;
  status: number | null;
  buttonDisabled: boolean;
}
