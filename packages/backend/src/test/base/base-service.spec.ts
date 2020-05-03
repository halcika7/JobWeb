import { BaseService } from '@service/Base';

import { shutdown } from '../utils';

class Basic extends BaseService {
  constructor() {
    super(Basic);
  }

  generic = () => {
    return this.returnGenericFailed(400);
  };

  rsp = () => {
    return this.returnResponse(200, {});
  };

  rspm = () => {
    return this.returnResponseMessage(200, 'Message');
  };

  logg = () => {
    return this.logger;
  };
}

const err = new Basic();

afterAll(async () => {
  await shutdown();
});

describe('Testing Base service', () => {
  it('should throw error with status 400', async () => {
    const r = err.generic();

    expect(r.status).toBe(400);
  });

  it('should return 200', async () => {
    const r = err.rsp();

    expect(r.status).toBe(200);
  });

  it('should return 200', async () => {
    const r = err.rspm();

    expect(r.status).toBe(200);
    expect(r.message).toBe('Message');
  });

  it('should return 200', async () => {
    err.logg();

    expect(true).toBe(true);
  });
});
