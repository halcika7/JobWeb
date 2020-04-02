import React, { FC } from 'react';

export interface InputProps {
  classNames: string;
  name: string;
  label: string;
  required?: boolean;
  type: string;
}

const Input: FC<InputProps> = ({
  classNames,
  name,
  label,
  required,
  type,
}): JSX.Element => {
  return (
    <div className={classNames}>
      <label htmlFor={name}>
        {label} {required && <span>*</span>}
        <input type={type} id={name} name={name} />
      </label>
    </div>
  );
};

export default Input;
