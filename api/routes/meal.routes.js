import { Router } from 'express';
import MealController from '../controllers/meal.controllers';

const router = Router();

router.get('/', MealController.fetchAllMeals);
router.post('/', MealController.addAMealOption);
router.get('/:id', MealController.getAMealOption);

export default router;
