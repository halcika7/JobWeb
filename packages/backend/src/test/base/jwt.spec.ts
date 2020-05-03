import { JWTService } from '@service/JWT';

import { shutdown } from '../utils';

const token = JWTService.signActivationToken({ id: 1, message: 'token' });

afterAll(async () => {
  await shutdown();
});

describe('Testing JWTService', () => {
  it('should create activation token', () => {
    expect(token).toBeTruthy();
  });

  it('should verify activation token', async () => {
    const verified = await JWTService.verifyToken(token, false);
    expect(verified).toBeTruthy();
  });

  it('should faill verify activation token', async () => {
    try {
      await JWTService.verifyToken('', false);
    } catch (error) {
      expect(error.status).toBe(401);
    }
  });
});
