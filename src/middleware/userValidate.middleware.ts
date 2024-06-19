import { check } from 'express-validator';

export const createUserValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('role', 'Role is required').not().isEmpty(),
  check('role', 'Invalid role').isIn(['user', 'monitor', 'coordinator'])
];

export const updateUserValidation = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('lastName', 'Last name is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('password', 'Password must be at least 6 characters long').optional().isLength({ min: 6 }),
  check('role', 'Role is required').optional().not().isEmpty(),
  check('role', 'Invalid role').optional().isIn(['user', 'monitor', 'coordinator'])
];

export const deleteUserValidation = [
  check('id', 'Valid ID is required').isMongoId()
];
