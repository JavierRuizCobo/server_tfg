import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';  // Añadir bcrypt para el hashing de contraseñas si es necesario

// Controlador para obtener los detalles de un usuario específico
export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId; 

    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Controlador para obtener la lista de usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Controlador para crear un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, lastName, email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      lastName,
      email,
      password: hashedPassword, 
      role
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Controlador para actualizar un usuario existente
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Si se está actualizando la contraseña, hay que hashearla
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Controlador para eliminar un usuario existente
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
