import React, { FC } from 'react';

export interface TextareaProps {
  classNames: string;
  name: string;
  label: string;
  required?: boolean;
  cols?: number;
  rows?: number;
  onChange: (value: any) => void; // Formik function
  onBlur: (value: any) => void; // Formik function
  onTouch: (value: any) => void; // Formik function
  error: string;
  touched: boolean;
  value: string;
}

const Textarea: FC<TextareaProps> = ({
  classNames,
  name,
  label,
  error,
  touched,
  value,
  required,
  cols = 10,
  rows = 10,
  onBlur,
  onChange,
  onTouch,
}): JSX.Element => (
  <div className={error && touched ? `${classNames} with-error` : classNames}>
    <label htmlFor={name}>
      {label}
      {required && <span>*</span>}
      <textarea
        value={value}
        name={name}
        id={name}
        cols={cols}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
        onTouchStart={onTouch}
      />
    </label>
    {error && touched && <div className="error">{error}</div>}
  </div>
);

export default React.memo(Textarea);
