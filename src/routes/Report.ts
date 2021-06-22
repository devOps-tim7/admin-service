import express from 'express';
import ReportController from '../controllers/ReportController';

const router = express.Router();

router.get('/', ReportController.getAll);
router.post('/:postId', ReportController.createReport);
router.post('/:id/:decision', ReportController.handleReport);

export default router;
