// types
import { Types } from '@job/redux';
import { Input } from '@components/UI/input/Input';
import { InterfaceSelect } from '@components/UI/input/Select';
import { FormikProps } from '@containers/Auth/IFormik';

type ValidNameValues =
  | 'username'
  | 'email'
  | 'password'
  | 'password2'
  | 'phone'
  | 'website'
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
    classNames: 'col-12 col-md-6',
    name: 'username',
    type: 'text',
    required: true,
    label: 'Username',
    autoComplete: 'new-password',
  },
  {
    classNames: 'col-12 col-md-6',
    name: 'email',
    type: 'email',
    required: true,
    label: 'Email Address',
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
  {
    classNames: 'col-12 col-md-6',
    name: 'password2',
    type: 'password',
    required: true,
    label: 'Confirm Password',
    autoComplete: 'new-password',
  },
  {
    classNames: 'col-12 hide-spinners',
    name: 'phone',
    type: 'tel',
    required: true,
    label: 'Phone',
    autoComplete: 'new-password',
  },
];

export const selects: RegisterSelectInputs[] = [
  {
    classNames: 'col-12 col-md-6',
    name: 'country',
    required: true,
    label: 'Country',
  },
  {
    classNames: 'col-12 col-md-6',
    name: 'city',
    required: true,
    label: 'City',
  },
];

export const companyInputs: RegisterInputs[] = [
  {
    classNames: 'col-12 col-md-6',
    name: 'website',
    type: 'text',
    required: false,
    label: 'Website',
  },
  {
    classNames: 'col-12 col-md-6',
    name: 'company',
    type: 'text',
    required: true,
    label: 'Company Name',
  },
];

export interface RegisterFormikProps extends FormikProps {
  accountType: Types.AccountRegistrationType;
  countries: Types.Select[];
  cities: Types.SelectCities;
  onSubmit: (registerPostData: Types.AuthPostData) => any;
}
