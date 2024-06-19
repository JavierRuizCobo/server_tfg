import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


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

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, lastName, email, password, role } = req.body;

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
      role,
      active:false
    });

    await newUser.save();

    const JWT_SECRET = process.env.JWT_SECRET || 'clave_Segura';

    const token = jwt.sign({
      user: {
        id: newUser._id
      }
    },JWT_SECRET, { expiresIn: '24h' });

    sendActivationEmail(email, token);

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


const sendActivationEmail = (email: any, token: any) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Activar cuenta',
    text: `Por favor, haga clic en el siguiente enlace para activar su cuenta: http://localhost:4200/activar-cuenta?token=${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const updates = req.body;

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
