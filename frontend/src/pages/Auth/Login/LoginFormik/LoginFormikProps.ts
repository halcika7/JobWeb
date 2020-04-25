// types
import { Input } from '@components/UI/input/Input';
import { LoginData } from '@pages/Auth/store/types';
import { FormikProps } from '@pages/Auth/formik/IFormik';

type ValidNameValues = 'username' | 'password';

interface LoginInputs extends Input {
  name: ValidNameValues;
}

export const Inputs: LoginInputs[] = [
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'username',
    type: 'text',
    required: true,
    label: 'Username / Email',
    autoComplete: 'new-password',
  },
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'password',
    type: 'password',
    required: true,
    label: 'Password',
    autoComplete: 'new-password',
  },
];

export interface LoginFormikProps extends FormikProps {
  onSubmit: (loginData: LoginData) => void;
}
