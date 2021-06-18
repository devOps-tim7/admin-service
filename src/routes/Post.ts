import express from 'express';
import PostController from '../controllers/PostController';

const router = express.Router();

router.post('/', PostController.createPost);

export default router;
