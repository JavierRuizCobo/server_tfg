import express from 'express';
import * as exerciseController from '../controllers/exercise.controller';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';

const router = express.Router();

router.post('',[authMiddleware, hasRole(['monitor', 'coordinator'])], exerciseController.addExercise);
router.get('', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExerciseById);
router.delete('/:id',[authMiddleware, hasRole(['monitor', 'coordinator'])], exerciseController.deleteExerciseById);

export default router;
