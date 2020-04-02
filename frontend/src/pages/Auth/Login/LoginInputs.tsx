import React from 'react';
import Input, { InputProps } from 'components/UI/input/Input';

const inputs: InputProps[] = [
    {
      classNames: 'form-group col-12 col-md-6',
      name: 'username-email',
      type: 'text',
      required: true,
      label: 'Username / Email',
    },
    {
      classNames: 'form-group col-12 col-md-6',
      name: 'password',
      type: 'password',
      required: true,
      label: 'Password',
    },
  ];
const LoginInputs = () => (
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
  </div>
);

export default LoginInputs;
