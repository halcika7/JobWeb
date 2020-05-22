import React from 'react';
import { mount } from 'enzyme';
import Portal from '@components/UI/portal';

describe('Testing Text area component', () => {
  it('shoulld render component', () => {
    const comp = mount(
      <section>
        <Portal>
          <div>Content</div>
        </Portal>
      </section>
    );

    expect(comp.find('div').text()).toBe('Content');
    comp.unmount();
    expect(comp.find('div').length).toBe(0);
  });
});
