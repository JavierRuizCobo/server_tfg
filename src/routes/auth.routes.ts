import express from 'express';
import { registrarUsuario, iniciarSesion } from '../controllers/auth.controllers';

const router = express.Router();

// Rutas de autenticación
router.post('/registrar', registrarUsuario);
router.post('/iniciar-sesion', iniciarSesion);

export default router;
