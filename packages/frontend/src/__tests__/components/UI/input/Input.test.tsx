import React, { ChangeEvent } from 'react';
import { mount, ReactWrapper } from 'enzyme';

import InputElement from '@components/UI/input/Input';
import PhoneInputWrapper from 'react-phone-number-input/input';

describe('Testing input component', () => {
  let value = '';
  let component: ReactWrapper;

  const onBlur = () => jest.fn();
  const onTouch = () => jest.fn();
  const onChange = (val: ChangeEvent<HTMLInputElement>) => {
    value = val.target.value;
  };

  beforeEach(() => {
    component = mount(
      <InputElement
        classNames="input"
        error="Has error"
        label="Some label"
        name="testing_input"
        onBlur={onBlur}
        onChange={onChange}
        touched={true}
        type="text"
        value={value}
        onTouch={onTouch}
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should change value', () => {
    component.find('input').simulate('change', {
      target: { name: 'testing_input', value: 'haris' },
    });

    expect(value).toBe('haris');
    expect(component.find('label').length).toBe(1);
    expect(component.find('input').length).toBe(1);
  });

  it('should render error message', () => {
    expect(component.find('.error').length).toBe(1);
  });

  it('should render phone input', () => {
    const phone = mount(
      <InputElement
        classNames="input"
        error="Has error"
        label="Some label"
        name="testing_input"
        onBlur={onBlur}
        onChange={onChange}
        touched={true}
        type="tel"
        value={value}
        onTouch={onTouch}
      />
    );

    expect(phone.find(PhoneInputWrapper).length).toBe(1);
    phone.unmount();
  });
});
