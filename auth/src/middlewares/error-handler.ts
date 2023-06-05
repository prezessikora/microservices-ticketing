import { Request, Response, NextFunction } from 'express';

import { RequestValidationError } from '../errors/RequestValidationError';
import { DatabaseConnectionError } from '../errors/DatabaseConnectionError';
import { NotFoundError } from '../errors/not-found-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof RequestValidationError ||
    err instanceof DatabaseConnectionError ||
    err instanceof NotFoundError
  ) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong.',
      },
    ],
  });
};
