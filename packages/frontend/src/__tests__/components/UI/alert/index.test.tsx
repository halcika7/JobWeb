import React from 'react';
import { mount } from 'enzyme';

import Alert from '@components/UI/alert';
import { FaTimes } from 'react-icons/fa';

describe('Testing Alert component', () => {
  const onClose = () => jest.fn();
  const message = 'some message';

  it('should render alert', () => {
    const component = mount(<Alert message={message} onClose={onClose} />);

    expect(component.find('div').length).toBe(2);
    expect(component.find('button').length).toBe(1);
    expect(component.find(FaTimes).length).toBe(1);
    component.unmount();
  });

  it('should fire autoclose after 1s', async () => {
    const component = mount(
      <Alert
        message={message}
        onClose={onClose}
        autoDismissTime={1000}
        autoDismiss
        type="success"
      />
    );

    await new Promise(res =>
      setTimeout(
        () => res(expect(component.find('button').length).toBe(1)),
        2100
      )
    );

    component.unmount();
  });

  it('simulate clicking close alert button', async () => {
    const component = mount(
      <Alert
        message={message}
        onClose={onClose}
        autoDismiss={false}
        type="success"
      />
    );

    component.find('button').simulate('click');

    await new Promise(res =>
      setTimeout(
        () => res(expect(component.find('button').length).toBe(1)),
        600
      )
    );

    component.unmount();
  });
});
