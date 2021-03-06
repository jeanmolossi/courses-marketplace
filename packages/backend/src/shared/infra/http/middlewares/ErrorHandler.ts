import { Response, Request, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      stack: error.stack,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
    stack: error.stack,
  });
};
