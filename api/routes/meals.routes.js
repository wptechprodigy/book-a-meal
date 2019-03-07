import trimRequest from 'trim-request';
import { Router } from 'express';
import AuthController from '../controllers/auth';
import MealMiddleware from '../middleware/meals.middleware';
import MealController from '../controllers/meals.controllers';

const router = Router();

router.get(
  '/meals/',
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealController.fetchAllMeals,
);

router.get(
  '/meals/:id',
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealController.getAMealOption,
);

router.post(
  '/meals/',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealMiddleware.validateAddMealOption,
  MealController.addMealOption,
);

router.put(
  '/meals/:id',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealMiddleware.validateUpdateAMealOption,
  MealController.updateAMealOption,
);

router.delete(
  '/meals/:id',
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealController.deleteAMealOption,
);

export default router;
