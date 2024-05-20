import { Router } from 'express';
import {
  getAllRoutines,
  createRoutine,
  getRoutineById,
  deleteRoutineById
} from '../controllers/routines.controller';

const router = Router();

router.get('/', getAllRoutines);
router.post('/', createRoutine);
router.get('/:id', getRoutineById);
router.delete('/:id', deleteRoutineById);

export default router;
