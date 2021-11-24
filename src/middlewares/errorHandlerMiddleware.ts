import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/AppError';

interface IErrorHandler {
  (
    err: Error,
    _request: Request,
    response: Response,
    _: NextFunction,
  ): Response;
}

const errorHandler: IErrorHandler = (
  err: Error,
  _request: Request,
  response: Response,
  _: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    return response.status(500).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    message: 'Internal server error',
  });
};

export { errorHandler };
