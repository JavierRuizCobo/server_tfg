import { Request, Response } from 'express';
import { PlannedRoutine } from '../models/plannedRoutine.model';
import mongoose from 'mongoose';

export const createPlannedRoutine = async (req: Request, res: Response) => {
  try {

    console.log(req.body);

    const created_by = (req as any).userId;

    const routineData = {
      ...req.body,
      createdBy: created_by
    };

    const plannedRoutine = new PlannedRoutine(routineData);

    await plannedRoutine.save();
    res.status(201).json(plannedRoutine);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating planned routine', error });
  }
};

export const updatePlannedRoutine = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const updatedPlannedRoutine = await PlannedRoutine.findByIdAndUpdate(id, req.body);
    if (!updatedPlannedRoutine) {
      return res.status(404).json({ message: 'Planned routine not found' });
    }
    res.status(200).json(updatedPlannedRoutine);
  } catch (error) {
    res.status(500).json({ message: 'Error updating planned routine', error });
  }
};

export const getAllPlannedRoutines = async (req: Request, res: Response) => {
  try {
    const plannedRoutines = await PlannedRoutine.find();
    res.status(200).json(plannedRoutines);
  } catch (error) {
    res.status(500).json({ message: 'Error getting planned routines', error });
  }
};

export const deletePlannedRoutine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPlannedRoutine = await PlannedRoutine.findByIdAndDelete(id);
    if (!deletedPlannedRoutine) {
      return res.status(404).json({ message: 'Planned routine not found' });
    }
    res.status(200).json({ message: 'Planned routine deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting planned routine', error });
  }
};


export const getPlannedRoutinesByRoutineId = async (req: Request, res: Response) => {
  try {
    const { routineId } = req.params;
    const plannedRoutines = await PlannedRoutine.find({ routineId }).populate('exercises.exerciseId').lean();
    if (!plannedRoutines || plannedRoutines.length === 0) {
      return res.status(404).json({ message: 'No planned routines found for this routineId' });
    }
    plannedRoutines.forEach((routine: any) => {
      routine.exercises = routine.exercises.map((exerciseItem: any) => ({
        exercise: exerciseItem.exerciseId,
        series: exerciseItem.series
      }));
    });
    res.status(200).json(plannedRoutines);
  } catch (error) {
    res.status(500).json({ message: 'Error getting planned routines by routineId', error });
  }
};

export const getPlannedRoutineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validar que el id sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Buscar la rutina planificada por ID
    const plannedRoutine = await PlannedRoutine.findById(id).populate('exercises.exerciseId').lean();
    if (!plannedRoutine) {
      return res.status(404).json({ message: 'Planned routine not found' });
    }

    // Mapear los ejercicios para devolver la estructura correcta
    plannedRoutine.exercises = plannedRoutine.exercises.map((exerciseItem: any) => ({
      exerciseId: exerciseItem.exerciseId,
      exercise: exerciseItem.exerciseId,
      series: exerciseItem.series
    }));

    res.status(200).json(plannedRoutine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting planned routine by ID', error });
  }
};