import express from 'express';
import { handleLogin } from '../controllers/handleAuthController.js';

const authRouter = express.Router();

authRouter.post('/login', handleLogin);

export { authRouter };
