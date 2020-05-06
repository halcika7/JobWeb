import index from '../index';
import { mount } from 'enzyme';

describe('testing index file', () => {
  it('should render', () => {
    window.scroll = jest.fn();
    const com = mount(index);

    expect(com).toBeTruthy();
    com.unmount();
  });
});
