import express from 'express';
import { addPost, deletePost, listAllPosts } from '../controllers/post.controllers';

const router = express.Router();

router.post('', addPost);
router.delete('/:id', deletePost);
router.get('', listAllPosts);

export default router;
