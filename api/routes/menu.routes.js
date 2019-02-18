import { Router } from 'express';
import MenuController from '../controllers/menu.controllers';

const router = Router();

router.get('/', MenuController.fetchAllMenus);
router.post('/', MenuController.addAMealOption);
router.get('/:availableOn', MenuController.getMenuForADay);

export default router;
