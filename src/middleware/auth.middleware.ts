import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'No token provided, authorization denied' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'jwtsecret');
    const user = await User.findById(decoded.user.id);

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    (req as any).userId = user._id;
    (req as any).userRole = user.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


export const hasRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).userRole;
    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ authorized: false, message: 'Forbidden: Insufficient role', rol: userRole });
    }
  };
};

export const checkRolesFromQuery = (req: Request, res: Response, next: NextFunction) => {
  const roles = req.query.roles?.toString().split(',') || [];
  const userRole = (req as any).userRole;

  console.log(roles);


  if (roles.includes(userRole)) {
    next();
  } else {
    res.status(403).json({ authorized: false, message: 'Forbidden: Insufficient role', rol: userRole });
  }
};