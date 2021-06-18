import express from 'express';
import AgentRequestController from '../controllers/AgentRequestController';
import loggedIn from '../middleware/Auth';

const router = express.Router();

router.get('/', AgentRequestController.getRequests);
router.post('/', loggedIn, AgentRequestController.createRequest);
router.post('/:id/:approve', AgentRequestController.handleRequest);

export default router;
