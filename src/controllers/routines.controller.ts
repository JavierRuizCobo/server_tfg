import { Request, Response } from 'express';
import Routine from '../models/routine.model';
import Exercise from '../models/exercise.models';
import { Types } from 'mongoose';
import { PlannedRoutine } from '../models/plannedRoutine.model';
import nodemailer from 'nodemailer';
import { User } from '../models/user.model';

export const getAllRoutines = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const selectedUserId = req.query.selectUserId as string;

    let routines;
    if (selectedUserId) {
      routines = await Routine.find({
        $or: [
          { created_by: selectedUserId },
          { assigned_to: selectedUserId }
        ]
      });
    } else {
      routines = await Routine.find({
        $or: [
          { created_by: userId },
          { assigned_to: userId }
        ]
      });
    }

    res.json(routines);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createRoutine = async (req: Request, res: Response) => {
  try {
    const { name, description, exercises, assigned_to } = req.body;
    const created_by = (req as any).userId;

    const exercisesIds = exercises.map((exerciseId: string) => new Types.ObjectId(exerciseId));

    const newRoutine = new Routine({
      name,
      description,
      exercises: exercisesIds,
      created_by,
      assigned_to: assigned_to ? Types.ObjectId.createFromHexString(assigned_to) : null,
    });

    const savedRoutine = await newRoutine.save();
    res.status(201).json(savedRoutine);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getRoutineById = async (req: Request, res: Response) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    const exerciseIds = routine.exercises;
    const exercises = await Exercise.find({ _id: { $in: exerciseIds } });
    const exerciseNames = exercises.map(exercise => ({
      _id: exercise._id,
      name: exercise.name,
    }));

    const routineWithExerciseNames = {
      _id: routine._id,
      name: routine.name,
      description: routine.description,
      exercises: exerciseNames,
    };

    res.json(routineWithExerciseNames);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRoutineById = async (req: Request, res: Response) => {
  try {
    const deletedRoutine = await Routine.findByIdAndDelete(req.params.id);
    const deletedPlannedRoutine = await PlannedRoutine.deleteMany({routineId : req.params.id})
    if (!deletedRoutine || !deletedPlannedRoutine) {
      return res.status(404).json({ error: 'Routine not found' });
    }
    res.json({ message: 'Routine deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const sendRoutineRequestMail = async (req: Request, res: Response) => {
  const { user, experiencia, detalles } = req.body;

  const users = await User.find({ role: { $in: ['monitor'] }, active: true }, 'email');
  const to = users.map(user => user.email).join(',');

  const subject = `Solicitud de rutina de ${user}`;
  const message = `El usuario ${user} con experiencia ${experiencia} solicita una rutina con los siguientes detalles:\n\n${detalles}`;

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
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Error al enviar el correo');
  }
};
