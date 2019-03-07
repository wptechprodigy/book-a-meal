import trimRequest from 'trim-request';
import { Router } from 'express';
import AuthController from '../controllers/auth';
import MealMiddleware from '../middleware/meals.middleware';
import MenuController from '../controllers/menus.controllers';

const router = Router();

router.get(
  '/menu/',
  AuthController.checkForToken,
  AuthController.verifyUserToken,
  MenuController.getMenus,
);

router.get(
  '/menu/caterer',
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MenuController.getMenuForAParticularDay,
);

router.post(
  '/menu/',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealMiddleware.validateAddMealToMenu,
  MenuController.addMealToMenu,
);

export default router;
