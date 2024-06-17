import { Request, Response } from 'express';
import { PlannedRoutine } from '../models/plannedRoutine.model';
import mongoose from 'mongoose';

export const createPlannedRoutine = async (req: Request, res: Response) => {
  try {
    const created_by = (req as any).userId;

    const { routineId, date } = req.body;

    const existingRoutine = await PlannedRoutine.findOne({ routineId: routineId, date });

    if (existingRoutine) {
      return res.status(400).json({ message: 'Ya existe una rutina planificada para ese día' });
    }


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
    const updatedPlannedRoutine = await PlannedRoutine.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
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
    const plannedRoutines = await PlannedRoutine.find().populate('exercises.exerciseId').lean();
    plannedRoutines.forEach((routine: any) => {
      routine.exercises = routine.exercises.map((exerciseItem: any) => ({
        exercise: exerciseItem.exerciseId,
        series: exerciseItem.series
      }));
    });
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const plannedRoutine = await PlannedRoutine.findById(id).populate('exercises.exerciseId').lean();
    if (!plannedRoutine) {
      return res.status(404).json({ message: 'Planned routine not found' });
    }

    //Darle una vuelta
    plannedRoutine.exercises = plannedRoutine.exercises.map((exerciseItem: any) => ({
      exerciseId: exerciseItem.exerciseId._id,
      exercise: exerciseItem.exerciseId,
      series: exerciseItem.series
    }));

    res.status(200).json(plannedRoutine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting planned routine by ID', error });
  }
};
