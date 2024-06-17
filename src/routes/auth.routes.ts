import express from 'express';
import {login, isAuthenticated, logout, activateAccount, desactivateAccount, sendActivationEmail } from '../controllers/auth.controllers';
import { authMiddleware, checkRolesFromQuery, hasRole } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/iniciar-sesion', login);
router.get('/esta-autenticado', authMiddleware, isAuthenticated);
router.post('/activar-cuenta', activateAccount);
router.post('/desactivar-cuenta',[authMiddleware, hasRole(['coordinator'])], desactivateAccount);
router.post('/enviar-correo-activacion',[authMiddleware, hasRole(['coordinator'])], sendActivationEmail);



router.get('/comprobar-roles', authMiddleware, checkRolesFromQuery, (req, res) => {
  res.status(200).json({ authorized: true });
});

router.post('/cerrar-sesion',authMiddleware, logout);

export default router;
