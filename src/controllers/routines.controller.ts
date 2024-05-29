import { Request, Response } from 'express';
import Routine from '../models/routine.model';
import Exercise from '../models/exercise.models';
import { Types } from 'mongoose';

export const getAllRoutines = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const selectedUserId = req.query.selectUserId as string;

    console.log("Auth user:   " + userId)
    console.log("Select user:  " + selectedUserId)

    let routines;
    if (selectedUserId) {
      // Si el usuario es un monitor y se proporciona un userId, obtener rutinas de ese usuario
      routines = await Routine.find({
        $or: [
          { created_by: selectedUserId },
          { assigned_to: selectedUserId }
        ]
      });
    } else {
      // Si no, obtener rutinas del usuario autenticado
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
    const { name, description, exercises, creation_date, assigned_to } = req.body;
    const created_by = (req as any).userId;

    const exercisesIds = exercises.map((exerciseId: string) => new Types.ObjectId(exerciseId));

    console.log(assigned_to);

    const newRoutine = new Routine({
      name,
      description,
      exercises: exercisesIds,
      created_by,
      assigned_to: assigned_to ? Types.ObjectId.createFromHexString(assigned_to) : null,
      creation_date,
    });

    const savedRoutine = await newRoutine.save();

    res.status(201).json(savedRoutine);
  } catch (err : any) {
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
  } catch (err : any) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteRoutineById = async (req: Request, res: Response) => {
  try {
    const deletedRoutine = await Routine.findByIdAndDelete(req.params.id);
    if (!deletedRoutine) {
      return res.status(404).json({ error: 'Routine not found' });
    }
    res.json({ message: 'Routine deleted successfully' });
  } catch (err : any) {
    res.status(500).json({ error: err.message });
  }
};
