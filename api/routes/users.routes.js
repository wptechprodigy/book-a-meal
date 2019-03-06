import trimRequest from 'trim-request';
import { Router } from 'express';
import UserController from '../controllers/user.controllers';
import UserMiddleware from '../middleware/user.middleware';

const router = Router();

router.post(
  '/auth/signup',
  trimRequest.body,
  UserMiddleware.validateRegisteration,
  UserController.registerUser
);

router.post(
  '/auth/login',
  trimRequest.body,
  UserMiddleware.validateLogin,
  UserController.loginUser
);

export default router;
