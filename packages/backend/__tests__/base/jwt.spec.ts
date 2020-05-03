import { JWTService } from '@service/JWT';

import { shutdown } from '../utils';

const token = JWTService.signActivationToken({ id: 1, message: 'token' });

describe('Testing JWTService', () => {
  afterAll(async () => {
    await shutdown();
  });
  test('should create activation token', () => {
    expect(token).toBeTruthy();
  });

  test('should verify activation token', async () => {
    const verified = await JWTService.verifyToken(token, false);
    expect(verified).toBeTruthy();
  });

  test('should faill verify activation token', async () => {
    try {
      await JWTService.verifyToken('', false);
    } catch (error) {
      expect(error.status).toBe(401);
    }
  });
});
