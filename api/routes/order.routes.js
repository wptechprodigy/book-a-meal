import { Router } from 'express';
import OrderController from '../controllers/order.controllers';

const router = Router();

router.get('/', OrderController.fetchAllOrders);
router.post('/', OrderController.addAnOrder);
router.get('/:mealId', OrderController.getAnOrder);
router.put('/:mealId', OrderController.updateAnOrder);
router.delete('/:mealId', OrderController.deleteAnOrder);

export default router;
