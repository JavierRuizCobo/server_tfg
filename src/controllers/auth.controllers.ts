import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model';

export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { nombre, apellido, correo, contraseña, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    let usuario = await Usuario.findOne({ correo });

    if (usuario) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    // Crear un nuevo usuario
    usuario = new Usuario({
      nombre,
      apellido,
      correo,
      contraseña, 
      rol
    });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(contraseña, salt);

    // Guardar el usuario en la base de datos
    await usuario.save();

    res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

export const iniciarSesion = async (req: Request, res: Response): Promise<void> => {
  const { correo, contraseña } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      res.status(400).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Verificar la contraseña
    const esContraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!esContraseñaValida) {
      res.status(400).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Crear y enviar token de acceso
    const payload = {
      usuario: {
        id: usuario._id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET || 'jwtsecret', { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error : any) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
