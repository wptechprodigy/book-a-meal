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

    const newMeal = meal;
    newMeal.id = newId;
    dummyDBData.meals.push(meal);
    return meal;
  },
  getAMeal(id) {
    const foundMeal = dummyDBData.meals.find(meal => meal.id === Number(id));
    return foundMeal || {};
  },
  updateAMeal(id, data) {
    const mealToBeUpdated = dummyDBData.meals.find(meal => meal.id === Number(id));
    const index = dummyDBData.meals.indexOf(mealToBeUpdated);
    dummyDBData.meals[index].name = data.name || mealToBeUpdated.name;
    dummyDBData.meals[index].price = data.price || mealToBeUpdated.price;
    dummyDBData.meals[index].description = data.description || mealToBeUpdated.description;
    return dummyDBData.meals[index];
  },
  deleteAMealOption(id) {
    const mealToBeDeleted = dummyDBData.meals.find(meal => meal.id === Number(id));
    const index = dummyDBData.meals.indexOf(mealToBeDeleted);
    dummyDBData.meals.splice(index, 1);
    return {};
  },
};

export default MealService;
