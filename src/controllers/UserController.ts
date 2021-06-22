import { Response } from 'express';
import User from '../models/User';

const createUser = async ({ body }, res: Response) => {
  const { id, banned, fullName, username } = body;

  const user = new User({ id, banned, fullName, username });
  const savedUser = await user.save();
  res.status(201).send(savedUser);
};

const updateUser = async ({ body }, res: Response) => {
  const { id, banned, fullName, username } = body;

  let user = await User.findOne(id);
  user.banned = banned;
  user.fullName = fullName;
  user.username = username;

  await user.save();
  res.status(204).end();
};

export default {
  createUser,
  updateUser,
};
