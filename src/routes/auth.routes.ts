import express from 'express';
import { registerUser, login, isAuthenticated } from '../controllers/auth.controllers';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/registrar', registerUser);
router.post('/iniciar-sesion', login);
router.get('/esta-autenticado', authMiddleware, isAuthenticated);

export default router;
