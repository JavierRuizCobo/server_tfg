import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers['authorization'];

  // Verificar si no hay token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No hay token, autorización denegada' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar el token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'jwtsecret');

    // Almacenar el _id del usuario en el objeto req
    (req as any).usuarioId = decoded.usuario.id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};
