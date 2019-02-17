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
    return res.status(201).json({
      status: 'Success',
      data: createdMeal,
    });
  },
  getAMealOption(req, res) {
    const { id } = req.params;
    const foundMeal = MealService.getAMeal(id);
    res.status(200).json({
      status: 'Success',
      data: foundMeal,
    });
  },
};

export default MealController;
