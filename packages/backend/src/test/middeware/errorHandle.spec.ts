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

afterAll(async () => {
  await shutdown();
});

describe('Testing error handling middlleware', () => {
  it('should throw error with status 400', async () => {
    try {
      throw new BadRequestException();
    } catch (error) {
      errorHandle(error, req, res, next);
      expect(res.status).toBeCalledWith(400);
    }
  });

  it('should throw error with status 500', async () => {
    try {
      throw new Error();
    } catch (error) {
      errorHandle(error, req, res, next);
      expect(res.status).toBeCalledWith(500);
    }
  });
});
