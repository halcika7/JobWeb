import { Response } from 'express';

export const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(undefined);
  return res;
};

export const mockRequest = () => {
  const req = {} as any;
  req.ip = '12';
  req.rateLimit = {
    limit: 5,
    current: 6,
    remaining: 0,
    resetTime: new Date(),
  };
  req.headers = {};
  req.headers.authorization = '';
  return req;
};

export const mockNextFunction = () => {
  return jest.fn();
};
