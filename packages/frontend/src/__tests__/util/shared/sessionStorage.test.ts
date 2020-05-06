import { SessionStorage } from '@shared/sessionStorage';

describe('Testing session storage', () => {
    it('should be truthy', () => {
        SessionStorage.setValue('ja', 'ja');
        const item = SessionStorage.getItem('ja');
        expect(item).toBe("\"ja\"");

        SessionStorage.removeItem('ja');
        SessionStorage.clear();
    });
});