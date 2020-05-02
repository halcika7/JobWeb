import { Request, Response, NextFunction } from 'express';

// static services
import { JWTService } from '@service/JWT';

// types
import { Token } from '@ctypes';

import { HTTPCodes } from '@job/common';

import { Logger, LoggerFactory } from '@logger';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const jwt = JWTService;
  const authorization = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  if (!authorization) {
    return res
      .status(HTTPCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized request.' });
  }

  try {
    const verifyRefresh = (await jwt.verifyToken(
      authorization,
      false
    )) as Token;

    req.user = {
      id: verifyRefresh.id,
      role: verifyRefresh.role,
    };
  } catch (error) {
    const logger = LoggerFactory.getLogger('Auth_Middleware') as Logger;
    logger.error(error, 'Error catched');

    return res
      .status(HTTPCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized request.' });
  }

  return next();
}
