import { Router } from 'express';
import { sendMail } from '../controllers/mail.controller';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/send', [authMiddleware, hasRole(['user'])],sendMail);

export default router;
