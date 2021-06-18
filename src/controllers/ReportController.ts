import { Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import PropertyError from '../exceptions/PropertyError';
import { Decision } from '../helpers/shared';
import Post from '../models/Post';
import Report from '../models/Report';
import PostService from '../services/PostService';
import UserService from '../services/UserService';

const getAll = async (_req: Request, res: Response) => {
  const reports = await Report.find();
  res.status(200).send(reports);
};
const createReport = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  const post = await Post.findOne(postId);
  if (!post) {
    throw new HttpException(404, [new PropertyError('base', 'Post not found!')]);
  }

  const report = new Report({ post });
  const savedReport = await report.save();

  res.status(201).send(savedReport);
};
const handleReport = async (req: Request, res: Response) => {
  const id = req.params.id;
  const decision = +req.params.decision;

  const report = await Report.findOne(id, { relations: ['post', 'post.user'] });
  if (!report) {
    throw new HttpException(404, [new PropertyError('base', 'Report not found!')]);
  }
  switch (decision) {
    case Decision.Remove:
      await PostService.removePost(report.post);
      report.post.removed = true;
      await report.post.save();
      break;
    case Decision.Ban:
      await UserService.banUser(report.post);
      report.post.user.banned = true;
      await report.post.user.save();
      break;
    default:
      break;
  }

  await Report.delete({ post: report.post });

  res.status(204).send();
};

export default {
  getAll,
  createReport,
  handleReport,
};
