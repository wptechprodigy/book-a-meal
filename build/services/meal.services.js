"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyDBData = _interopRequireDefault(require("../utils/dummyDBData"));

var _meal = _interopRequireDefault(require("../models/meal.models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MealService = {
  fetchAllMeals: function fetchAllMeals() {
    var validMeals = _dummyDBData.default.meals.map(function (meal) {
      var newMeal = new _meal.default();
      newMeal.id = meal.id;
      newMeal.name = meal.name;
      newMeal.price = meal.price;
      newMeal.description = meal.description;
      return newMeal;
    });

    return validMeals;
  },
  addMeal: function addMeal(meal) {
    var mealsLength = _dummyDBData.default.meals.length;
    var lastId = _dummyDBData.default.meals[mealsLength - 1].id;
    var newId = lastId + 1;
    var newMeal = meal;
    newMeal.id = newId;

    _dummyDBData.default.meals.push(meal);

    return meal;
  },
  getAMeal: function getAMeal(id) {
    var foundMeal = _dummyDBData.default.meals.find(function (meal) {
      return meal.id === Number(id);
    });

    return foundMeal || {};
  },
  updateAMeal: function updateAMeal(id, data) {
    var mealToBeUpdated = _dummyDBData.default.meals.find(function (meal) {
      return meal.id === Number(id);
    });

    var index = _dummyDBData.default.meals.indexOf(mealToBeUpdated);

    _dummyDBData.default.meals[index].name = data.name || mealToBeUpdated.name;
    _dummyDBData.default.meals[index].price = data.price || mealToBeUpdated.price;
    _dummyDBData.default.meals[index].description = data.description || mealToBeUpdated.description;
    return _dummyDBData.default.meals[index];
  },
  deleteAMealOption: function deleteAMealOption(id) {
    var mealToBeDeleted = _dummyDBData.default.meals.find(function (meal) {
      return meal.id === Number(id);
    });

    var index = _dummyDBData.default.meals.indexOf(mealToBeDeleted);

    _dummyDBData.default.meals.splice(index, 1);

    return {};
  }
};
var _default = MealService;
exports.default = _default;
//# sourceMappingURL=meal.services.js.map