import { check, param } from 'express-validator';

export const validateRoutine = [
    check('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    check('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string'),
    check('exercises').isArray().withMessage('Exercises must be an array').notEmpty().withMessage('Exercises are required'),
    check('exercises.*').isMongoId().withMessage('Each exercise must be a valid Mongo ID'),
    check('assigned_to').optional().isMongoId().withMessage('Assigned to must be a valid Mongo ID')
];

export const validateRoutineId = [
    param('id').isMongoId().withMessage('Invalid routine ID')
];
