import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import Breadcrumb from '@components/UI/breadcrumb';

describe('Testing Breadcrumb component', () => {
  it('should render 2 links', () => {
    const component = shallow(
      <Breadcrumb
        breadcrumbs={[
          { href: '', text: 'LINK1' },
          { href: '', text: 'LINK2' },
        ]}
      />
    );

    expect(component.find(Link).length).toEqual(2);
    component.unmount();
  });
});
