import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];

  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided, authorization denied' });
    return;
  }

  // const token = authHeader.split(' ')[1];

  const token = req.cookies.token;

  console.log(token);

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'jwtsecret');

    (req as any).userId = decoded.user.id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
