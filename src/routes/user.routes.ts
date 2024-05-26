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
  deleteUserValidation, 
  validate 
} from '../middleware/userValidate.middleware';

const router = express.Router();

router.get('/', [authMiddleware, hasRole(['monitor, coordinador'])], getUsers);

router.get('/detalles', authMiddleware, getUserDetails);

router.post('/', [authMiddleware, hasRole(['coordinador'])], createUserValidation, validate, createUser);

router.put('/:id', [authMiddleware, hasRole(['coordinador'])], updateUserValidation, validate, updateUser);

router.delete('/:id', [authMiddleware, hasRole(['coordinador'])], deleteUserValidation, validate, deleteUser);

export default router;
