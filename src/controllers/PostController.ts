import { Response } from 'express';
import HttpException from '../exceptions/HttpException';
import PropertyError from '../exceptions/PropertyError';
import Post from '../models/Post';
import User from '../models/User';

const createPost = async ({ body }, res: Response) => {
  const { user_id, id, removed } = body;
  const user = await User.findOne(user_id);

  if (!user) {
    throw new HttpException(404, [new PropertyError('base', 'User not found!')]);
  }
  const post = new Post({ id, user, removed });
  const savedPost = await post.save();
  res.status(201).send(savedPost);
};

export default {
  createPost,
};
