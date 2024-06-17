import express from 'express';
import { addPost, deletePost, listAllPosts } from '../controllers/post.controllers';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';
import { validatePost, validatePostId } from '../middleware/postValidate.middleware';
import { validate } from '../middleware/handleValidations.middleware';

const router = express.Router();

router.post(
    '',
    [authMiddleware, hasRole(['monitor', 'coordinator'])], validatePost, validate,
    addPost
);

router.delete(
    '/:id',
    [authMiddleware, hasRole(['monitor', 'coordinator'])], validatePostId, validate,
    deletePost
);

router.get(
    '',
    [authMiddleware],
    listAllPosts
);

export default router;
