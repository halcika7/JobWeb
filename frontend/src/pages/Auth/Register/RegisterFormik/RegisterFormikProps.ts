import { Input } from 'components/UI/input/Input';
import { InterfaceSelect } from 'components/UI/input/Select';

type ValidNameValues =
  | 'username'
  | 'email'
  | 'password'
  | 'password2'
  | 'phone'
  | 'web'
  | 'company';

type ValidSelectNames = 'country' | 'city';

interface RegisterInputs extends Input {
  name: ValidNameValues;
}

interface RegisterSelectInputs extends InterfaceSelect {
  name: ValidSelectNames;
}

export const inputs: RegisterInputs[] = [
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'username',
    type: 'text',
    required: true,
    label: 'Username',
  },
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'email',
    type: 'email',
    required: true,
    label: 'Email Address',
  },
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'password',
    type: 'password',
    required: true,
    label: 'Password',
  },
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'password2',
    type: 'password',
    required: true,
    label: 'Confirm Password',
  },
  {
    classNames: 'form-group col-12 hide-spinners',
    name: 'phone',
    type: 'tel',
    required: true,
    label: 'Phone',
  },
];

export const selects: RegisterSelectInputs[] = [
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'country',
    required: true,
    label: 'Country',
  },
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'city',
    required: true,
    label: 'City',
  },
];

export const companyInputs: RegisterInputs[] = [
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'web',
    type: 'text',
    required: false,
    label: 'Website',
  },
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'company',
    type: 'text',
    required: true,
    label: 'Company Name',
  },
];
