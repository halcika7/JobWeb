import React from 'react';
import { mount } from 'enzyme';
import Input from '@components/UI/input/Input';
import PhoneInputWrapper from 'react-phone-number-input/input';

describe('Testing input', () => {
  let value = '';
  const onBlur = () => jest.fn();
  const onTouch = () => jest.fn();
  const onChange = (e: any) => {
    value = e.target.value;
  };
  it('should render input', done => {
    const component = mount(
      <Input
        classNames="input"
        error="some error"
        label="input"
        name="phone"
        onBlur={onBlur}
        onChange={onChange}
        onTouch={onTouch}
        touched
        type="tel"
        value={value}
      />
    );

    component.find(PhoneInputWrapper).simulate('change', '+387');

    component.unmount();
    done();
  });
});
