import dummyDBData from '../utils/dummyDBData';
import Menu from '../models/menu.models';

const MenuService = {
  fetchMenus() {
    const validMenus = dummyDBData.menus.map((menu) => {
      const newMenu = new Menu();
      newMenu.availableOn = menu.availableOn;
      newMenu.mealOptions = menu.mealOptions;
      return newMenu;
    });
    return validMenus;
  },
  addAMealOption(newMealOption) {
    /*
      Expeting an object that contains,
      if no menu has already been set for the  day
      { "availableOn": moment().format() To be handled by moment.now
        "mealOption": [
          {
            id
            name
            price
            description
          }
        ];
      }
      If it has, then matched available on is sort for
      and only a full meal description is added to the mealOptions

    */
    const addedOn = newMealOption.availableOn;
    const mealOptionArr = [];
    // const menuKeys = Object.keys(menus);
    const menuToAdd = dummyDBData.menus.map((menu) => {
      const dateExisted = menu.availableOn;
      const selectedMeal = dummyDBData.meals
        .find(mealOption => mealOption.id === newMealOption.mealOption.id);
      const newMeal = (dateExisted === addedOn) ? (
        menu.mealOptions.push(selectedMeal),
        {
          availableOn: dateExisted,
          mealOption: selectedMeal,
        }
      ) : (
        mealOptionArr.push(selectedMeal),
        dummyDBData.menus.push({
          availableOn: addedOn,
          mealOptions: mealOptionArr,
        }),
        {
          availableOn: addedOn,
          mealOption: mealOptionArr,
        }
      );
      return newMeal;
    });
    return menuToAdd;
  },
  getMenuForParticularDay(availableOn) {
    const menuForAParticularDay = dummyDBData.menus.find(menu => menu.availableOn === availableOn);
    return menuForAParticularDay || {};
  },
};

export default MenuService;
