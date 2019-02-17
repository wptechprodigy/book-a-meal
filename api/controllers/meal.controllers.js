import MealService from '../services/meal.services';

const MealController = {
  fetchAllMeals(req, res) {
    const allMeals = MealService.fetchAllMeals();
    res.status(200).json({
      status: 'Success',
      data: allMeals,
    });
  },
  addAMealOption(req, res) {
    /*
    Expect a sample json object
    {
      "name": "Meal name",
      "price" "meal price",
      "description": "Meal description",
    }
    */
    const newMeal = req.body;
    const createdMeal = MealService.addMeal(newMeal);
    res.status(201).json({
      status: 'Meal option added successfully',
      data: createdMeal,
    });
  },
  getAMealOption(req, res) {
    const { id } = req.params;
    const foundMeal = MealService.getAMeal(id);
    res.status(200).json({
      status: 'Meal retrieved successfully',
      data: foundMeal,
    });
  },
  updateAMealOption(req, res) {
    const { id } = req.params;
    const updatedMealOption = MealService.updateAMeal(id, req.body);
    res.status(201).json({
      status: 'Meal updated successfully',
      data: updatedMealOption,
    });
  },
  deleteAMealOption(req, res) {
    const { id } = req.params;
    MealService.deleteAMealOption(id);
    const allMeals = MealService.fetchAllMeals();
    res.status(204).json({
      status: 'Meal deleted successfully',
      data: allMeals,
    });
  },
};

export default MealController;
