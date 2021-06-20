import { Response } from 'express';
import User from '../models/User';

const createUser = async ({ body }, res: Response) => {
  const { id, banned, fullName } = body;

  const user = new User({ id, banned, fullName });
  const savedUser = await user.save();
  res.status(201).send(savedUser);
};

const updateUser = async ({ body }, res: Response) => {
  const { id, banned, fullName } = body;

  let user = await User.findOne(id);
  user.banned = banned;
  user.fullName = fullName;

  await user.save();
  res.status(204).end();
};

export default {
  createUser,
  updateUser,
};
