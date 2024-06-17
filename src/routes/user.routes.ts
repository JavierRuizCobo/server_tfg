import express from 'express';
import { 
    getUserDetails,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';
import { 
  createUserValidation, 
  updateUserValidation, 
  deleteUserValidation 
} from '../middleware/userValidate.middleware';
import { validate } from '../middleware/handleValidations.middleware';

const router = express.Router();

router.get('/', [authMiddleware, hasRole(['monitor','coordinator'])], getUsers);

router.get('/detalles', authMiddleware, getUserDetails);

router.post('/', [authMiddleware, hasRole(['coordinator'])], createUserValidation, validate, createUser);

router.put('/:id', [authMiddleware, hasRole(['coordinator'])], updateUserValidation, validate, updateUser);

router.delete('/:id', [authMiddleware, hasRole(['coordinator'])], deleteUserValidation, validate, deleteUser);

export default router;
