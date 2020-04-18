import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

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
    throw new Error('Token is missing / not provided');
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
    throw new Error('Invalid token');
  }
}
