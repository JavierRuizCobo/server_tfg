import { Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';

export const obtenerDetallesUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).usuarioId; // Obtener el _id del usuario del objeto req

    const usuario = await Usuario.findById(usuarioId).select('-contraseña');

    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.json(usuario);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
