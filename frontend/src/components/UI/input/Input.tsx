import React, { FC } from 'react';
import PhoneInputWrapper from 'react-phone-number-input/input';

export interface Input {
  classNames: string;
  name: string;
  label: string;
  required?: boolean;
  type: string;
}

interface InputProps extends Input {
  value: string;
  onChange: (value: any) => void; // Formik function
  onBlur: (value: any) => void; // Formik function
  onTouch: (value: any) => void; // Formik function
  error: string;
  touched: boolean;
}

const InputElement: FC<InputProps> = ({
  classNames,
  name,
  label,
  required,
  type,
  error,
  touched,
  value,
  onChange: handleChange,
  onBlur,
  onTouch,
}): JSX.Element => (
  <div className={error && touched ? `${classNames} with-error` : classNames}>
    <label htmlFor={name}>
      {label}
      {required && <span>*</span>}
      {type !== 'tel' ? (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          onTouchStart={onTouch}
          // autoComplete="password"
          // autoCorrect="off"
        />
      ) : (
        <PhoneInputWrapper
          value={value}
          onChange={(val: string) => {
            const ev = {
              target: {
                type: 'text',
                name,
                id: name,
                value: val,
              },
            };
            handleChange(ev);
          }}
          id={name}
          name={name}
          onBlur={onBlur}
        />
      )}
    </label>
    {error && touched && <div className="error">{error}</div>}
  </div>
);

export default React.memo(InputElement);
