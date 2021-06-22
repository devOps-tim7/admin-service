import { Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import PropertyError from '../exceptions/PropertyError';
import { CustomRequest } from '../middleware/Auth';
import AgentRequest from '../models/AgentRequest';
import User from '../models/User';
import UserService from '../services/UserService';

const createRequest = async (req: CustomRequest, res: Response) => {
  const { website, email } = req.body;
  const user = await User.findOne(req.user.id);
  const existingRequest = await AgentRequest.findOne({ user });
  if (existingRequest) {
    res.status(201).send(existingRequest);
  } else {
    const agentRequest = new AgentRequest({ user, website, email });
    const savedAgentRequest = await agentRequest.save();
    res.status(201).send(savedAgentRequest);
  }
};

const getRequests = async (_req: Request, res: Response) => {
  const agentRequests = await AgentRequest.find({ relations: ['user'] });
  res.send(agentRequests);
};

const handleRequest = async (req: Request, res: Response) => {
  const approve = req.params.approve;
  const user = await User.findOne(req.params.id);

  if (!user) {
    throw new HttpException(404, [new PropertyError('base', 'User not found!')]);
  }

  if (approve === 'approve') {
    await UserService.approveUser(user);
  }

  await AgentRequest.delete({ user });

  res.status(204).end();
};

export default {
  createRequest,
  handleRequest,
  getRequests,
};
