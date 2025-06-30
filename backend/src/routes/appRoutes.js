import express from 'express';
import {
  handleGetVisitor,
  handlePostMessage,
  handlePostVisitor,
} from '../controllers/handleAppController.js';

const appRouter = express.Router();

// Visitor tracking endpoint
appRouter.post('/visitors', handlePostVisitor);

// Get visitor count
appRouter.get('/visitors', handleGetVisitor);

// Contact form endpoint
appRouter.post('/contact', handlePostMessage);

export { appRouter };
