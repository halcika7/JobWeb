import { Input } from '@components/UI/input/Input';
import { LoginData } from '@containers/Auth/store/types';
import { FormikProps } from '@containers/Auth/IFormik';

type ValidNameValues = 'username' | 'password';

interface LoginInputs extends Input {
  name: ValidNameValues;
}

export const Inputs: LoginInputs[] = [
  {
    classNames: 'col-12 col-md-6',
    name: 'username',
    type: 'text',
    required: true,
    label: 'Username / Email',
    autoComplete: 'new-password',
  },
  {
    classNames: 'col-12 col-md-6',
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
