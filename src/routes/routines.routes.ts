import { Router } from 'express';
import {
  getAllRoutines,
  createRoutine,
  getRoutineById,
  deleteRoutineById
} from '../controllers/routines.controller';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', [authMiddleware, hasRole(['user', 'monitor'])], getAllRoutines);
router.post('/', [authMiddleware, hasRole(['user', 'monitor'])], createRoutine);
router.get('/:id', [authMiddleware, hasRole(['user', 'monitor'])], getRoutineById);
router.delete('/:id', [authMiddleware, hasRole(['user', 'monitor'])], deleteRoutineById);

export default router;
