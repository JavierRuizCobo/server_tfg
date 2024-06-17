import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { User } from '../models/user.model';

dotenv.config();

export const sendMail = async (req: Request, res: Response) => {
  const { subject, message } = req.body;

  // Usuarios con rol monitor o coordinador
  // const to = "javircrc10@gmail.com";

  const users = await User.find({ role: { $in: ['monitor', 'coordinator'] }, active: true }, 'email');
  const to = users.map(user => user.email).join(',');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({message: 'Correo enviado con éxito'});
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Error al enviar el correo');
  }
};
