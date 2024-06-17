import { check, param } from 'express-validator';

export const validatePost = [
    check('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
    check('content').notEmpty().withMessage('Content is required').isString().withMessage('Content must be a string')
];

export const validatePostId = [
    param('id').isMongoId().withMessage('Invalid post ID')
];
