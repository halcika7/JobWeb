import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SweetAlert from '@components/UI/sweetAlert';

describe('Testing Sweet Alert component', () => {
  let closed = '';
  let component: ReactWrapper;
  const onClose = () => {
    closed = 'closed alert';
  };

  beforeEach(() => {
    component = mount(
      <SweetAlert
        message="basic message"
        withButtons
        successButton="done"
        callBack={onClose}
        additionalMessage="other message"
      />
    );

    closed = '';
  });

  afterEach(() => {
    component.unmount();
  });
  it('should render', () => {
    expect(component.find('div').length).toBe(7);
    expect(component.find('button').length).toBe(1);
    expect(component.find('p').length).toBe(2);
  });

  it('simulate button click', () => {
    component.find('button').simulate('click');

    expect(closed).toBe('closed alert');
  });

  it('simulate error alert', () => {
    const error = mount(
      <SweetAlert
        message="basic message"
        withButtons={true}
        failedButton="done"
        additionalMessage="other message"
        type="error"
      />
    );
    error.find('button').simulate('click');

    expect(closed).toBe('');
    expect(error.find('div').length).toBe(5);

    error.unmount();
  });

  it('simulate warning alert', () => {
    const warning = mount(
      <SweetAlert message="basic message" withButtons={false} type="warning" />
    );
    expect(warning.find('p').length).toBe(1);
    expect(warning.find('div').length).toBe(4);

    warning.unmount();
  });

  it('simulate info alert', () => {
    const info = mount(
      <SweetAlert message="basic message" withButtons={false} type="info" />
    );

    expect(info.find('p').length).toBe(1);

    info.unmount();
  });

  it('simulate without buttoons alert', () => {
    const info = mount(
      <SweetAlert message="basic message" withButtons={false} type="info" />
    );
    expect(info.find('button').length).toBe(0);

    info.unmount();
  });
});
