import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware para validar los resultados de express-validator
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validaciones para crear usuario
export const createUserValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('role', 'Role is required').not().isEmpty(),
  check('role', 'Invalid role').isIn(['user', 'monitor', 'coordinator'])  // Añadir esta línea para validar el rol
];

// Validaciones para actualizar usuario
export const updateUserValidation = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('lastName', 'Last name is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('password', 'Password must be at least 6 characters long').optional().isLength({ min: 6 }),
  check('role', 'Role is required').optional().not().isEmpty(),
  check('role', 'Invalid role').optional().isIn(['user', 'monitor', 'coordinator'])  // Añadir esta línea para validar el rol
];

// Validaciones para eliminar usuario
export const deleteUserValidation = [
  check('id', 'Valid ID is required').isMongoId()
];
