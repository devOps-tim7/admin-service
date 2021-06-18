require('express-async-errors');
import express from 'express';
import cors from 'cors';
import errorHandler from './src/middleware/ErrorHandler';
import PostRoutes from './src/routes/Post';
import UserRoutes from './src/routes/User';
import ReportRoutes from './src/routes/Report';
import AgentRequestRoutes from './src/routes/AgentRequest';

export const createServer = () => {
  const app = express();
  app.use(express.json({ limit: '8mb' }));
  app.use(cors());
  app.use('/api/admin/posts', PostRoutes);
  app.use('/api/admin/users', UserRoutes);
  app.use('/api/admin/reports', ReportRoutes);
  app.use('/api/admin/requests', AgentRequestRoutes);
  app.use(errorHandler);
  return app;
};
