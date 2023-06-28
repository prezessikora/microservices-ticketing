import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '../errors/AuthenticationError';
import jwt from 'jsonwebtoken';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new AuthenticationError();
  }
  next();
};
