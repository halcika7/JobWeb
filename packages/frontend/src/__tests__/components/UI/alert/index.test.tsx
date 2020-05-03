import React from 'react';
import { mount } from 'enzyme';

import Alert from '@components/UI/alert';
import { FaTimes } from 'react-icons/fa';

describe('Testing Alert component', () => {
  const onClose = () => jest.fn();
  const message = 'some message';

  it('should render alert with close button', () => {
    const component = mount(<Alert message={message} onClose={onClose} />);

    expect(component.find('div').length).toBe(2);
    expect(component.find('button').length).toBe(1);
    expect(component.find(FaTimes).length).toBe(1);
    component.unmount();
  });

  it('should not render button', () => {
    const component = mount(
      <Alert
        message={message}
        onClose={onClose}
        autoDismissTime={2000}
        autoDismiss
        type="success"
      />
    );

    expect(component.find('button').length).toBe(0);
    expect(component.find(FaTimes).length).toBe(0);
    component.unmount();
  });
});
