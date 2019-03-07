import trimRequest from 'trim-request';
import { Router } from 'express';
import AuthController from '../controllers/auth';
import OrderMiddleware from '../middleware/orders.middleware';
import OrderController from '../controllers/orders.controllers';

const router = Router();

router.get(
  '/orders',
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  OrderController.getAllMealsOrderedFromACaterer,
);

router.get(
  '/orders/user',
  AuthController.checkForToken,
  AuthController.verifyUserToken,
  OrderController.getOrdersByUser,
);

router.post(
  '/orders',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyUserToken,
  OrderMiddleware.validateAddToOrder,
  OrderController.addAnOrder,
);

router.put(
  '/orders/:orderId',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyUserToken,
  OrderMiddleware.validateModifyOrder,
  OrderController.modifyOrder,
);

export default router;
