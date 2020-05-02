import React, { FC } from 'react';

export interface TextareaProps {
  classNames: string;
  name: string;
  label: string;
  required?: boolean;
  cols?: number;
  rows?: number;
}

const Textarea: FC<TextareaProps> = ({
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
        {label}
        {required && <span>*</span>}
        <textarea name={name} id={name} cols={cols} rows={rows} />
      </label>
    </div>
  );
};

export default React.memo(Textarea);
