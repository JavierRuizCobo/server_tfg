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
import { validatePlannedRoutine, validatePlannedRoutineId, validateRoutineId } from '../middleware/plannedRoutinesValidate.middleware';
import { validate } from '../middleware/handleValidations.middleware';

const router = Router();

router.post(
  '/',
  authMiddleware,
  hasRole(['user', 'monitor']),
  validatePlannedRoutine,
  validate,
  createPlannedRoutine
);

router.get(
  '/:id',
  authMiddleware,
  hasRole(['user', 'monitor']),
  validatePlannedRoutineId,
  validate,
  getPlannedRoutineById
);

router.put(
  '/:id',
  authMiddleware,
  hasRole(['user']),
  validatePlannedRoutine,
  validatePlannedRoutineId,
  validate,
  updatePlannedRoutine
);

router.get(
  '/',
  authMiddleware,
  hasRole(['user', 'monitor']),
  getAllPlannedRoutines
);

router.delete(
  '/:id',
  authMiddleware,
  hasRole(['user']),
  validatePlannedRoutineId,
  validate,
  deletePlannedRoutine
);

router.get(
  '/routine/:routineId',
  validateRoutineId,
  validate,
  getPlannedRoutinesByRoutineId
);

export default router;
