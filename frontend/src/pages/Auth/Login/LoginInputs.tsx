/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import Input, { Input as IInput } from 'components/UI/input/Input';

const inputs: IInput[] = [
  {
    classNames: 'form-group col-12 col-md-6',
    name: 'username',
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
        value=""
        onBlur={() => {}}
        onChange={() => {}}
        onTouch={() => {}}
        error=""
        touched
      />
    ))}
  </div>
);

export default LoginInputs;
