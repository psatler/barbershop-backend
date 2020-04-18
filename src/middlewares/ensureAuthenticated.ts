import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: string; // issued at
  exp: string; // expires in
  sub: string; // subject (whom the token refers to)
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // jwt validation
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing / not provided', 401);
  }

  // Bearer <token>
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    // creating a user property in the request object so that we can use it in the next route
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
