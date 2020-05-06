import { authMiddleware } from '@middleware/auth';
import { shutdown } from '../utils';
import {
  mockResponse,
  mockRequest,
  mockNextFunction,
} from '../__mocks__/express';
import { JWTService } from '@service/JWT';

const req = mockRequest();
const res = mockResponse();
const next = mockNextFunction();

describe('Testing error handling middlleware', () => {
  afterAll(async () => {
    await shutdown();
  });
  test('should throw error with status 401', async () => {
    try {
      await authMiddleware(req, res, next);
    } catch {
      expect(res.status).toBeCalledWith(401);
      expect(res.json).toBeCalledWith({ message: 'Unauthorized request.' });
    }
  });

  test('should throw error with status 500', async () => {
    req.headers.authorization = 'Bearer aocajsdfjoaf';
    try {
      await authMiddleware(req, res, next);
    } catch {
      expect(res.status).toBeCalledWith(401);
      expect(res.json).toBeCalledWith({ message: 'Unauthorized request.' });
    }
  });

  test('should pass', async () => {
    const token = JWTService.signToken({
      id: 1,
      role: { id: 10, type: 'sdadasdasd' },
    });

    req.headers.authorization = `Bearer ${token}`;

    await authMiddleware(req, res, next);

    expect(req.user.id).toBe(1);
    expect(req.user.role.id).toBe(10);
    expect(req.user.role.type).toBe('sdadasdasd');
  });
});
