import React, { FC, useState } from 'react';

import { Types } from '@job/redux';

import SelectWrapper from 'react-select';

import { ErrorDiv, FormGroup, InputLabel, LabelSpan } from './styled';

export interface InterfaceSelect {
  classNames: string;
  name: string;
  label: string;
  required?: boolean;
}

interface SelectProps extends InterfaceSelect {
  options: Types.Select[];
  value: string;
  setFieldValue: (value: any, option: any) => void; // Formik function
  onBlur: (value: any) => void; // Formik function
  onTouch: (value: any) => void; // Formik function
  error: string;
  touched: boolean;
}

const SelectInput: FC<SelectProps> = ({
  options,
  classNames,
  name,
  label,
  required,
  value,
  setFieldValue,
  onBlur,
  onTouch,
  error,
  touched,
}): JSX.Element => {
  const defValue = { value: '', label: '' };
  const [localVal, setLocalVal] = useState<Types.Select>({
    value: '',
    label: '',
  });

  return (
    <FormGroup error={!!error && touched} className={classNames}>
      <InputLabel htmlFor={name}>
        {label}
        {required && <LabelSpan> *</LabelSpan>}
        <SelectWrapper
          value={value ? localVal : defValue}
          defaultInputValue={value}
          defaultValue={value ? localVal : defValue}
          options={options || []}
          inputId={name}
          placeholder=""
          name={name}
          onBlur={onBlur}
          onFocus={onTouch}
          tabSelectsValue
          onChange={(option: any) => {
            const {
              value: thisValue,
              label: thisLabel,
            } = option as Types.Select;
            setLocalVal({ value: thisValue, label: thisLabel });
            setFieldValue(name, thisValue);
            if (name === 'country' && value !== thisValue) {
              setFieldValue('city', '');
            }
          }}
        />
      </InputLabel>
      {error && touched && <ErrorDiv>{error}</ErrorDiv>}
    </FormGroup>
  );
};

export default React.memo(SelectInput);
