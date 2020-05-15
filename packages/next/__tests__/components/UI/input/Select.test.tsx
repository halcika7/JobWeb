import React from 'react';
import { mount } from 'enzyme';
import Select from '@components/UI/input/Select';
import SelectWrapper from 'react-select';
import { act } from 'react-dom/test-utils';

describe('Testing input', () => {
  let value = '';
  const onBlur = () => jest.fn();
  const onTouch = () => jest.fn();
  const onChange = (_: string, val: any) => {
    value = val;
  };

  it('should render input', done => {
    const component = mount(
      <Select
        classNames="input"
        error="some error"
        label="input"
        name="phone"
        onBlur={onBlur}
        onTouch={onTouch}
        touched
        value={value}
        options={[{ label: 'option1', value: 'option1' }]}
        setFieldValue={onChange}
      />
    );

    act(() => {
      component.find(SelectWrapper).prop('onChange')({
        label: '2',
        value: '2',
      });

      component.update();

      expect(value).toBe('2');

      component.unmount();
      done();
    });
  });

  it('should render input', done => {
    const component = mount(
      <Select
        classNames="input"
        error="some error"
        label="input"
        name="country"
        onBlur={onBlur}
        onTouch={onTouch}
        touched
        value={value}
        options={[
          { label: 'option1', value: 'option1' },
          {
            label: '2',
            value: '2',
          },
        ]}
        setFieldValue={onChange}
      />
    );

    act(() => {
      component.find(SelectWrapper).prop('onChange')({
        label: 'option1',
        value: 'option1',
      });

      expect(value).toBe('');

      component.unmount();
      done();
    });
  });
});
