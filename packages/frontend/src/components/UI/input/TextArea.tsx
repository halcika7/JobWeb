import React, { FC } from 'react';

import {
  ErrorDiv,
  FormGroup,
  InputLabel,
  TextareaWrapper,
  LabelSpan,
} from './styled';

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
  <FormGroup error={!!error && touched} className={classNames}>
    <InputLabel htmlFor={name}>
      {label}
      {required && <LabelSpan>*</LabelSpan>}
      <TextareaWrapper
        as="textarea"
        value={value}
        name={name}
        id={name}
        cols={cols}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
        onTouchStart={onTouch}
      />
    </InputLabel>
    {error && touched && <ErrorDiv>{error}</ErrorDiv>}
  </FormGroup>
);

export default React.memo(Textarea);
