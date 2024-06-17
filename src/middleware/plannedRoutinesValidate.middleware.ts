import { check, param } from 'express-validator';

export const validatePlannedRoutine = [
    check('routineId').isMongoId().withMessage('Routine ID must be a valid Mongo ID'),
    check('date').isISO8601().toDate().withMessage('Date must be a valid ISO 8601 date'),
    check('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
    check('exercises').isArray().withMessage('Exercises must be an array'),
    check('exercises.*.exerciseId').isMongoId().withMessage('Exercise ID must be a valid Mongo ID'),
    check('exercises.*.series').isArray().withMessage('Series must be an array'),
    check('exercises.*.series.*.reps').isInt({ min: 1 }).withMessage('Reps must be an integer greater than 0'),
    check('exercises.*.series.*.weight').isFloat({ min: 0 }).withMessage('Weight must be a float greater than or equal to 0'),
];

export const validatePlannedRoutineId = [
    param('id').isMongoId().withMessage('Invalid planned routine ID')
];
export const validateRoutineId = [
    param('routineId').isMongoId().withMessage('Invalid routine ID')
];
