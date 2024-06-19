import express from 'express';
import {login, isAuthenticated, logout, activateAccount, desactivateAccount, sendActivationEmail } from '../controllers/auth.controllers';
import { authMiddleware, checkRolesFromQuery, hasRole } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', login);
router.get('/is-authenticated', authMiddleware, isAuthenticated);
router.post('/activate-account', activateAccount);
router.post('/desactivate-account', [authMiddleware, hasRole(['coordinator'])], desactivateAccount);
router.post('/send-activation-email', [authMiddleware, hasRole(['coordinator'])], sendActivationEmail);

router.get('/check-roles', authMiddleware, checkRolesFromQuery, (req, res) => {
  res.status(200).json({ authorized: true });
});

router.post('/logout', authMiddleware, logout);


export default router;
