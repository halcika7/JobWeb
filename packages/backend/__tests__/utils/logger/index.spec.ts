import { Logger } from '@logger';

describe('Testing logger', () => {
  it('should create new instance', () => {
    const logger = new Logger('Testing');

    logger.debug('testing debug method', 'itt');
    logger.info('testing debug method', 'itt');
    logger.warning('testing debug method', 'itt');
    logger.error(new Error('message'), 'itt');
    logger.error('some error string', 'itt');

    expect(logger.debug).toBeTruthy();
  });
});
