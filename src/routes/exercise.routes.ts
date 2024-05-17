import express from 'express';
import * as exerciseController from '../controllers/exercise.controller';

const router = express.Router();

router.post('', exerciseController.addExercise);
router.get('', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExerciseById);
router.delete('/:id', exerciseController.deleteExerciseById);

export default router;
