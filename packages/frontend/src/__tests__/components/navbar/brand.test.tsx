import React from 'react';
import { mount } from 'enzyme';
import Brand from '@components/navbar/Brand';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Testing Brand component', () => {
  let toggled = false;
  const changeTheme = (_: string) => jest.fn();
  const toggleNav = () => {
    toggled = !toggled;
  };

  it('shoulld render component', () => {
    const comp = mount(
      <Router>
        <Brand
          changeTheme={changeTheme}
          toggled={toggled}
          switchTheme="black"
          toggleNav={toggleNav}
        />
      </Router>
    );

    comp.find('button').at(0).simulate('click');

    comp.unmount();
  });
});
