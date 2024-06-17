import { check, param } from 'express-validator';

export const validateExercise = [
    check('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    check('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string'),
    check('difficulty').notEmpty().withMessage('Difficulty is required').isString().withMessage('Difficulty must be a string')
        .isIn(['Fácil', 'Media', 'Difícil']).withMessage('Difficulty must be one of Fácil, Media, Difícil'),
    check('muscles').notEmpty().withMessage('Muscles is required').isString().withMessage('Muscles must be a string'),
    check('video').optional().isString().withMessage('Video must be a string')
        .matches(/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/).withMessage('Video must be a valid YouTube URL'),
];

export const validateExerciseId = [
    param('id').isMongoId().withMessage('Invalid exercise ID')
];
