import React from 'react';
import { mount } from 'enzyme';
import LargeSpinner from '@components/UI/Spinner/LargeSpinner';

describe('Testing spinner component', () => {
  it('should render spinner', () => {
    const component = mount(<LargeSpinner />);

    expect(component.find('div').length).toBe(2);

    component.unmount();
  });
});
