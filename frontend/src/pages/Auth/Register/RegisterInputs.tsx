import Input, { InputProps } from 'components/UI/input/Input';
import React, { FC } from 'react';

interface RegisterInputsProps {
  accountType: string;
}

const inputs: InputProps[] = [
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
    name: 'password-2',
    type: 'password',
    required: true,
    label: 'Confirm Password',
  },
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'country',
    type: 'text',
    required: true,
    label: 'Country',
  },
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'city',
    type: 'text',
    required: true,
    label: 'City',
  },
  {
    classNames: 'form-group col-12',
    name: 'phone',
    type: 'tel',
    required: true,
    label: 'Phone',
  },
];

const companyInputs: InputProps[] = [
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'web',
    type: 'text',
    required: true,
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

const RegisterInputs: FC<RegisterInputsProps> = ({ accountType }) => (
  <div className="inputs row">
    {inputs.map(({ classNames, name, type, required, label }) => (
      <Input
        classNames={classNames}
        name={name}
        type={type}
        required={required}
        label={label}
        key={`register-input-${name}`}
      />
    ))}
    {accountType === 'company' &&
      companyInputs.map(({ classNames, name, type, required, label }) => (
        <Input
          classNames={classNames}
          name={name}
          type={type}
          required={required}
          label={label}
          key={`register-input-${name}`}
        />
      ))}
  </div>
);

export default React.memo(RegisterInputs);
