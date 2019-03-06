import Menu from '../models/menu';
import Meal from '../models/meals';

class MenuController {
  static generateDate() {
    const date = new Date();
    const month = `${date.getMonth() + 1}`;
    const today = `${date.getFullYear()}-${month.padStart(2, '0')}-${date.getDate()}`;
    return today;
  }

  static async getMenus(req, res) {
    const today = MenuController.generateDate();
    const menus = await Menu.findAll({ where: { createdAt: today } });
    return res.status(200).json({
      status: 'success',
      message: 'Menus retrieved successfully',
      data: menus,
    });
  }

  static async getMenuForAParticularDay(req, res) {
    const today = MenuController.generateDate();
    const menu = await Menu.findOne({ where: { createdAt: today, catererId: req.caterer.id } });
    return res.status(200).json({
      status: 'success',
      message: 'Menu retrieved successfully',
      data: menu,
    });
  }

  static async addMealToMenu(req, res) {
    try {
      const { mealId } = req.body;
      const meal = await Meal.findOne({ where: { id: mealId, catererId: req.caterer.id } });
      if (!meal) {
        throw new Error(`Meal with ID ${mealId} Doesn't exist`);
      }
      const { createdAt, updatedAt, ...safeMeal } = meal.dataValues;
      safeMeal.quantity = Number(quantity);
      const today = MenuController.generateDate();
      const menu = await Menu.findAll({ where: { catererId: req.caterer.id, createdAt: today } });
      let mealMenuOptions;
      if (menu.length === 0) {
        mealMenuOptions = [];
        mealOptions.push(safeMeal);
        await Menu.create({
          mealOptions: JSON.stringify(mealMenuOptions),
          catererId: req.caterer.id
        });
        await Meal.update({ where: { createdAt: today } });
      } else {
        mealOptions = await MenuController.updateMeals(menu[0], safeMeal, mealId);
        await Menu.update(
          { mealOptions: JSON.stringify(mealMenuOptions) },
          { where: { catererId: req.caterer.id, createdAt: today } }
        );
        const mealIndex = mealMenuOptions.findIndex(mealMenuOption => mealMenuOption.id === Number(mealId));
        await Meal.update({ where: { id: mealId } });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Meal Added to Menu',
        data: menuMeals
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async updateMeals(menu, safeMeal, mealId) {
    const { mealOptions } = menu.dataValues;
    const updatedMenuMeals = JSON.parse(mealOptions);
    const mealIndex = updatedMenuMeals.findIndex(menuMeal => menuMeal.id === Number(mealId));
    if (mealIndex < 0) {
      updatedMenuMeals.push(safeMeal);
    }
    return updatedMenuMeals;
  }
}

export default MenuController;
