import { errorHandle } from '@middleware/errorHandling';
import { shutdown } from '../utils';
import {
  mockResponse,
  mockRequest,
  mockNextFunction,
} from '../__mocks__/express';
import { BadRequestException } from '@job/common';

const req = mockRequest();
const res = mockResponse();
const next = mockNextFunction();

describe('Testing error handling middlleware', () => {
  afterAll(async () => {
    await shutdown();
  });
  test('should throw error with status 400', async () => {
    try {
      throw new BadRequestException();
    } catch (error) {
      errorHandle(error, req, res, next);
      expect(res.status).toBeCalledWith(400);
    }
  });

  test('should throw error with status 500', async () => {
    try {
      throw new Error();
    } catch (error) {
      errorHandle(error, req, res, next);
      expect(res.status).toBeCalledWith(500);
    }
  });
});
