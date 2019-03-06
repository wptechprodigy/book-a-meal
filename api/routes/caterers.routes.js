import trimRequest from 'trim-request';
import { Router } from 'express';
import CatererController from '../controllers/caterer.controllers';
import CatererMiddleware from '../middleware/caterer.middleware';

const router = Router();

router.post(
  '/auth/caterer/signup',
  trimRequest.body,
  CatererMiddleware.validateRegisteration,
  CatererController.registerCaterer
);

router.post(
  '/auth/caterer/login',
  trimRequest.body,
  CatererMiddleware.validateLogin,
  CatererController.loginCaterer
);

export default router;
