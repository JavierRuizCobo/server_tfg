import { Router } from 'express';
import {
  getAllRoutines,
  createRoutine,
  getRoutineById,
  deleteRoutineById,
  sendRoutineRequestMail
} from '../controllers/routines.controller';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';
import { validateRoutine, validateRoutineId } from '../middleware/routineValidate.middleware';
import { validate } from '../middleware/handleValidations.middleware';


const router = Router();

router.get(
  '/',
  authMiddleware,
  hasRole(['user', 'monitor']),
  getAllRoutines
);

router.post(
  '/',
  authMiddleware,
  hasRole(['user', 'monitor']),
  validateRoutine,
  validate,
  createRoutine
);

router.get(
  '/:id',
  authMiddleware,
  hasRole(['user', 'monitor']),
  validateRoutineId,
  validate,
  getRoutineById
);

router.delete(
  '/:id',
  authMiddleware,
  hasRole(['user', 'monitor']),
  validateRoutineId,
  validate,
  deleteRoutineById
);

router.post('/send-routine-request', [authMiddleware, hasRole(['user'])], sendRoutineRequestMail);

export default router;
