import { Request, Response } from 'express';
import { HealthyHabitsModel } from '../models/post.model';

export async function addPost(req: Request, res: Response): Promise<void> {
    try {
        const { title, content } = req.body;
        const created_by = (req as any).userId;
        const newPost = await HealthyHabitsModel.create({ title, content, created_by });
        res.status(201).json(newPost);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
}

export async function deletePost(req: Request, res: Response): Promise<void> {
    try {
        const postId = req.params.id;
        await HealthyHabitsModel.findByIdAndDelete(postId);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
}

export async function listAllPosts(req: Request, res: Response): Promise<void> {
    try {
        const allPosts = await HealthyHabitsModel.find();
        res.status(200).json(allPosts);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
}
