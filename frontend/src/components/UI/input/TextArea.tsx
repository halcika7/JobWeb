import React, { FC } from 'react';

export interface InputProps {
  classNames: string;
  name: string;
  label: string;
  required?: boolean;
  cols?: number;
  rows?: number;
}

const Input: FC<InputProps> = ({
  classNames,
  name,
  label,
  required,
  cols = 10,
  rows = 10,
}): JSX.Element => {
  return (
    <div className={classNames}>
      <label htmlFor={name}>
        {label} {required && <span>*</span>}
        <textarea name={name} id={name} cols={cols} rows={rows}></textarea>
      </label>
    </div>
  );
};

export default Input;
