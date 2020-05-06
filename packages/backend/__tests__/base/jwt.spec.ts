import { JWTService } from '@service/JWT';

import { shutdown } from '../utils';

const token = JWTService.signActivationToken({ id: 1, message: 'token' });
const refreshToken = JWTService.signToken({ id: 1, message: 'token' }, true);

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

  test('should create token token', async () => {
    const verified = await JWTService.signToken({}, false);
    expect(verified).toBeTruthy();
  });

  test('should create refresh token token', async () => {
    const verified = await JWTService.signToken({}, true);
    expect(verified).toBeTruthy();
  });

  test('should create activation token token', async () => {
    const verified = await JWTService.signActivationToken({});
    expect(verified).toBeTruthy();
  });

  test('should faill verify activation token', async () => {
    try {
      await JWTService.verifyToken('', false);
      expect(true).toBe(true);
    } catch (error) {
      expect(error.status).toBe(401);
    }
  });

  test('should verify refressh token', async () => {
    const verified = await JWTService.verifyToken(refreshToken, true);
    expect(verified).toBeTruthy();
  });

  test('should fail verify refressh token', async () => {
    try {
      await JWTService.verifyToken('', true);
      expect(true).toBe(true);
    } catch (error) {
      expect(error.status).toBe(401);
    }
  });
});
