import { NextFunction, Request, Response } from 'express';
import { JWTService } from '../service/JWT';
import { Token } from '../types';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwt = new JWTService();
  const authorization = req.headers.authorization.split(' ')[1] || null;

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized request.' });
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
    return res.status(401).json({ message: 'Unauthorized request.' });
  }

  return next();
};
