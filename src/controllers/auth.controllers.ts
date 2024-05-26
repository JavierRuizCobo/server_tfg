import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, lastName, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    user = new User({
      name,
      lastName,
      email,
      password,
      role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const payload = {
      user: {
        id: user._id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET || 'jwtsecret', { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 }); // Asegúrate de usar `secure: true` en producción
      res.json({ message: 'Login successful' });
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const isAuthenticated = (req: Request, res: Response): void => {
  res.status(200).json({ authenticated: true});
};
