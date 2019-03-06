import MenuService from '../services/menu.services';

const MenuController = {
  fetchAllMenus(req, res) {
    const allMenus = MenuService.fetchMenus();
    res.status(200).json({
      status: 'Success',
      message: 'All menus were retrieved successfully',
      data: allMenus,
    });
  },
  addAMealOption(req, res) {
    /*
      Expect a sample json object
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
    */
    const newMealOption = req.body;
    const createdMenu = MenuService.addAMealOption(newMealOption);
    res.status(201).json({
      status: 'Success',
      message: 'Meal option added to menu successfully',
      data: createdMenu,
    });
  },
  getMenuForADay(req, res) {
    const { availableOn } = req.params;
    const foundMenu = MenuService.getMenuForParticularDay(availableOn);
    res.status(200).json({
      status: 'Success',
      message: 'Menu retrieved successfully',
      data: foundMenu || {},
    });
  },
};

export default MenuController;
