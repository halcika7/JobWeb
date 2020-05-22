import { SessionStorage } from '@shared/sessionStorage';

describe('Testing session storage', () => {
  it('should be truthy', () => {
    SessionStorage.setValue('ja', 'ja');
    const item = SessionStorage.getItem('ja');
    expect(item).toBe('"ja"');

    SessionStorage.removeItem('ja');
    SessionStorage.clear();
  });

  it('should get Authenticated', () => {
    const item = SessionStorage.getAuthenticated();

    expect(item).toBeFalsy();
  });
});
