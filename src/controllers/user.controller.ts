import { Request, Response } from 'express';
import { User } from '../models/user.model';

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
