import { LoggerFactory } from '@logger';

describe('Testing logger factory', () => {
  it('should use if statement', () => {
    const facotry = LoggerFactory.getLogger('Facotry');
    expect(facotry).toBeTruthy();
  });
});
