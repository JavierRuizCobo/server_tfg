import express from 'express';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';
import { validateExercise, validateExerciseId } from '../middleware/exerciseValidate.middleware';
import { validate } from '../middleware/handleValidations.middleware';
import { addExercise, deleteExerciseById, getAllExercises, getExerciseById, updateExerciseById } from '../controllers/exercise.controller';

const router = express.Router();

router.post(
    '',
    authMiddleware,
    hasRole(['monitor', 'coordinator']),
    validateExercise,
    validate,
    addExercise
);

router.get(
    '',
    authMiddleware,
    getAllExercises
);

router.get(
    '/:id',
    authMiddleware,
    validateExerciseId,
    validate,
    getExerciseById
);

router.delete(
    '/:id',
    authMiddleware,
    hasRole(['monitor', 'coordinator']),
    validateExerciseId,
    validate,
    deleteExerciseById
);


router.put('/:id', 
    [authMiddleware, hasRole(['monitor', 'coordinator'])],
    validateExerciseId,
    validateExercise,
    validate, 
    updateExerciseById
);

export default router;
