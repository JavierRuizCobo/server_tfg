import { Router } from 'express';
import {
  createPlannedRoutine,
  updatePlannedRoutine,
  getAllPlannedRoutines,
  deletePlannedRoutine,
  getPlannedRoutinesByRoutineId
} from '../controllers/plannedRoutines.controllers';

const router = Router();

router.post('/', createPlannedRoutine);

router.put('/:id', updatePlannedRoutine);

router.get('/', getAllPlannedRoutines);

router.delete('/:id', deletePlannedRoutine);

router.get('/routine/:routineId', getPlannedRoutinesByRoutineId);

export default router;