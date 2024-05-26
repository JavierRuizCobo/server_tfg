import { Router } from 'express';
import {
  createPlannedRoutine,
  updatePlannedRoutine,
  getAllPlannedRoutines,
  deletePlannedRoutine,
  getPlannedRoutinesByRoutineId,
  getPlannedRoutineById
} from '../controllers/plannedRoutines.controllers';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/',[authMiddleware, hasRole(['user', 'monitor'])], createPlannedRoutine);

router.get('/:id',[authMiddleware, hasRole(['user', 'monitor'])], getPlannedRoutineById)

router.put('/:id',[authMiddleware, hasRole(['user'])], updatePlannedRoutine);

router.get('/',[authMiddleware, hasRole(['user', 'monitor'])], getAllPlannedRoutines);

router.delete('/:id',[authMiddleware, hasRole(['user'])], deletePlannedRoutine);

router.get('/routine/:routineId', getPlannedRoutinesByRoutineId);

export default router;
