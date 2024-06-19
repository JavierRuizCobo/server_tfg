import { Request, Response } from 'express';
import Exercise from '../models/exercise.models';

export const addExercise = async (req: Request, res: Response) => {
    try {
        const created_by = (req as any).userId;

        const exerciseData = {
            ...req.body,
            created_by: created_by
          };

        console.log(exerciseData);
        const exercise = new Exercise(exerciseData);

        await exercise.save();
        res.status(201).send(exercise);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAllExercises = async (req: Request, res: Response) => {
    try {
        const exercises = await Exercise.find();
        res.send(exercises);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getExerciseById = async (req: Request, res: Response) => {
    const _id = req.params.id;

    try {
        const exercise = await Exercise.findById(_id);
        if (!exercise) {
            return res.status(404).send();
        }
        res.send(exercise);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteExerciseById = async (req: Request, res: Response) => {
    const _id = req.params.id;

    try {
        const exercise = await Exercise.findByIdAndDelete(_id);
        if (!exercise) {
            return res.status(404).send();
        }
        res.send(exercise);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateExerciseById = async (req: Request, res: Response) => {
    const _id = req.params.id;

    try {
        const exercise = await Exercise.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!exercise) {
            return res.status(404).send();
        }
        res.send(exercise);
    } catch (error) {
        res.status(400).send(error);
    }
};
