import { Request, Response } from 'express';
import Exercise from '../models/exercise.models';

export const addExercise = async (req: Request, res: Response) => {
    try {
        const exercise = new Exercise(req.body);
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

    console.log(_id);

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