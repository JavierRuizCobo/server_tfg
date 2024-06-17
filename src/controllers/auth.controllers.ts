import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import nodemailer from 'nodemailer';



const JWT_SECRET = process.env.JWT_SECRET || 'clave_Segura';


export const activateAccount = async (req: Request, res: Response) => {
  const { token, email, password } = req.body;

  try {
    // Verificar el token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'clave_Segura');

    // El token es válido, busca al usuario por _id
    const user = await User.findById(decoded.user.id);

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    // Verificar el correo electrónico y la contraseña
    if (user.email !== email || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Marcar la cuenta como activa
    user.active = true;
    await user.save();

    res.status(200).json({ message: 'Account activated successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

export const desactivateAccount = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.active = false;
    await user.save();

    res.status(200).json({ message: 'Account deactivated successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendActivationEmail = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const token = jwt.sign({
      user: {
        id: user._id
      }
    },JWT_SECRET, { expiresIn: '24h' });
    const activationLink = `http://localhost:4200/activar-cuenta?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Account Activation',
      text: `Please click the following link to activate your account: ${activationLink}`,
      html: `<p>Please click the following link to activate your account:</p><p><a href="${activationLink}">${activationLink}</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Activation email sent' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });


    if (!user?.active) {
      res.status(400).json({ message: 'Cuenta no activa' });
      return;
    }

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

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h', algorithm: 'HS512' }, (error, token) => {
      if (error) throw error;
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000, secure: true });
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

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token', { httpOnly: true, secure: true });
  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};
