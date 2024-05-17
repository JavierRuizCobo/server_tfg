import express from 'express';
import { getUserDetails } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// router.get('/', authMiddleware, obtenerUsuarios);
// router.post('/', authMiddleware, crearUsuario);
router.get('/detalles', authMiddleware, getUserDetails);

export default router;
