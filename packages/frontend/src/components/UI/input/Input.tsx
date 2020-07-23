import React, { FC } from 'react';
import PhoneInputWrapper from '@job/yup';

import {
  ErrorDiv,
  FormGroup,
  InputLabel,
  InputWrapper,
  LabelSpan,
} from './styled';

export interface Input {
  classNames: string;
  name: string;
  label: string;
  required?: boolean;
  type: string;
  autoComplete?: 'on' | 'off' | 'password' | 'new-password';
  autoCorrect?: 'on' | 'off';
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
  autoComplete = 'on',
  autoCorrect = 'off',
}): JSX.Element => {
  const showError = !!error && touched;
  return (
    <FormGroup error={showError} className={classNames}>
      <InputLabel htmlFor={name}>
        {label}
        {required && <LabelSpan> *</LabelSpan>}
        {type !== 'tel' ? (
          <InputWrapper
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            onTouchStart={onTouch}
            autoComplete={autoComplete}
            autoCorrect={autoCorrect}
          />
        ) : (
          <InputWrapper
            as={PhoneInputWrapper}
            value={value}
            onChange={(val: string) => {
              const ev = {
                target: { type: 'text', name, id: name, value: val },
              };
              handleChange(ev);
            }}
            id={name}
            name={name}
            onBlur={onBlur}
          />
        )}
      </InputLabel>
      {showError && <ErrorDiv>{error}</ErrorDiv>}
    </FormGroup>
  );
};

export default React.memo(InputElement);
