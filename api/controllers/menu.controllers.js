import moment from 'moment';
import MenuService from '../services/menu.services';

const MenuController = {
  fetchAllMenus(req, res) {
    const allMenu = MenuService.fetchAllMenus();
    res.status(200).json({
      status: 'Success',
      data: allMenu,
    });
  },
  addAMealOption(req, res) {
    /*
      Expect a sample json object
      { 
        "availableOn": moment.now() To be handled by moment.now
        "mealOptions": [];
      }
    */
    const newMenu = req.body;
    const createdMenu = MenuService.addMenu(newMenu);
    res.status(201).json({
      status: 'Menu setup successfully',
      availableOn: moment.now(),
      data: createdMenu,
    });
  },
  getMenuForADay(req, res) {
    const { availableOn } = req.params;
    const foundMenu = MenuService.getMenuForParticularDay(availableOn);
    res.status(200).json({
      status: 'Menu retrieved successfully',
      data: foundMenu,
    });
  },
};

export default MenuController;
