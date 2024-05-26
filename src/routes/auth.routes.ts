import express from 'express';
import { registerUser, login, isAuthenticated } from '../controllers/auth.controllers';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/registrar', registerUser);
router.post('/iniciar-sesion', login);
router.get('/esta-autenticado', authMiddleware, isAuthenticated);

router.get('/rol/user', authMiddleware, hasRole(['user']), (req, res) => {
    console.log("E");

    res.status(200).json({ authorized: true });
  });
  
  router.get('/rol/monitor', authMiddleware, hasRole(['monitor']), (req, res) => {
    console.log("E");

    res.status(200).json({ authorized: true });
  });
  
  router.get('/rol/coordinador', authMiddleware, hasRole(['coordinador']), (req, res) => {
    console.log("E");
    res.status(200).json({ authorized: true });
  });

export default router;
