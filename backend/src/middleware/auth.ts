import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.slice(7); // Remove "Bearer " prefix
    const payload = verifyToken(token);

    req.user = {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const optionalAuthMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const payload = verifyToken(token);
      req.user = {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
      };
    }
  } catch {
    // If token is invalid, just continue without user
  }

  next();
};
