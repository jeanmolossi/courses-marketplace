import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import jwtConfig from '@config/jwt';
import AppError from '../errors/AppError';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const headerAuth = request.headers.authorization;

  if (!headerAuth) {
    throw new AppError('Authorization is missing');
  }

  const [, token] = headerAuth.split('Bearer ');

  if (!token)
    throw new AppError('Authorization token is missing or type invalid');

  try {
    const decoded = verify(token, jwtConfig.secret);

    if (!decoded) throw new AppError('Invalid token');

    const { sub } = decoded;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token');
  }
};
