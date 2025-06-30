import express from 'express';
import {
  handleAdminGetVisitors,
  handleGetSubmitMessages,
} from '../controllers/handleAdminController.js';

const adminRouter = express.Router();

adminRouter.get('/visitors', handleAdminGetVisitors);
adminRouter.get('/messages', handleGetSubmitMessages);

export { adminRouter };
