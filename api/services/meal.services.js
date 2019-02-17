import dummyDBData from '../utils/dummyDBData';
import Meal from '../models/meal.models';

const MealService = {
  fetchAllMeals() {
    const validMeals = dummyDBData.meals.map((meal) => {
      const newMeal = new Meal();
      newMeal.id = meal.id;
      newMeal.name = meal.name;
      newMeal.price = meal.price;
      newMeal.description = meal.description;
      return newMeal;
    });
    return validMeals;
  },
  addMeal(meal) {
    const mealsLength = dummyDBData.meals.length;
    const lastId = dummyDBData.meals[mealsLength - 1].id;
    const newId = lastId + 1;
    meal.id = newId;
    dummyDBData.meals.push(meal);
    return meal;
  },
  getAMeal(id) {
    const meal = dummyDBData.meals.find(meal => meal.id === id);
    return meal || {};
  },
};

export default MealService;
