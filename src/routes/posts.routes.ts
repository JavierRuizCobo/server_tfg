import express from 'express';
import { addPost, deletePost, listAllPosts } from '../controllers/post.controllers';
import { authMiddleware, hasRole } from '../middleware/auth.middleware';

const router = express.Router();

router.post('', [authMiddleware, hasRole(['monitor', 'coordinator'])], addPost);
router.delete('/:id', [authMiddleware, hasRole(['monitor', 'coordinator'])], deletePost);
router.get('',[authMiddleware], listAllPosts);

export default router;
