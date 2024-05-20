import { Request, Response } from 'express';
import Routine from '../models/routine.model';
import Exercise from '../models/exercise.models';
import { Types } from 'mongoose';

export const getAllRoutines = async (req: Request, res: Response) => {
  try {
    const routines = await Routine.find();
    res.json(routines);
  } catch (err : any) {
    res.status(500).json({ error: err.message });
  }
};

export const createRoutine = async (req: Request, res: Response) => {
  try {
    const { name, description, exercises, creation_date} = req.body;

    const created_by = "6648e8954da354bde5d8de5e";

    exercises.map((exerciseId: string) => new Types.ObjectId(exerciseId));

    const newRoutine = new Routine({
      name,
      description,
      exercises,
      created_by,
      creation_date,
    });

    const savedRoutine = await newRoutine.save();

    console.log(savedRoutine);

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

    // Obtener los nombres de los ejercicios
    const exerciseIds = routine.exercises;
    const exercises = await Exercise.find({ _id: { $in: exerciseIds } });
    
    // Mapear los nombres de los ejercicios al formato deseado
    const exerciseNames = exercises.map(exercise => ({
      _id: exercise._id,
      name: exercise.name,
      // Puedes incluir otros campos de los ejercicios si los necesitas
    }));

    // Construir la respuesta con el nombre de los ejercicios
    const routineWithExerciseNames = {
      _id: routine._id,
      name: routine.name,
      // Agregar otros campos de la rutina si es necesario
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
