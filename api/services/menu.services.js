import dummyDBData from '../utils/dummyDBData';
import Menu from '../models/menu.models';
import MealService from './meal.services';

const MenuService = {
  fetchAllMenus() {
    const validMenus = dummyDBData.menus.map((menu) => {
      const newMenu = new Menu();
      newMenu.availableOn = menu.availableOn;
      newMenu.mealOptions = menu.mealOptions;
      return newMenu;
    });
    return validMenus;
  },
  addMenu(newMenu) {
    const grabAllMeals = dummyDBData.meals;
    return newMenu;
  },
  getMenuForParticularDay(availableOn) {
    const menu = dummyDBData.menus.find(menu => menu.availableOn === availableOn);
    return menu || {};
  },
};

export default MenuService;
