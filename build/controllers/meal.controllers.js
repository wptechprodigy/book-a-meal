"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meal = _interopRequireDefault(require("../services/meal.services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MealController = {
  fetchAllMeals: function fetchAllMeals(req, res) {
    var allMeals = _meal.default.fetchAllMeals();

    res.status(200).json({
      status: 'Success',
      message: 'Meals retrieved successfully',
      data: allMeals
    });
  },
  addAMealOption: function addAMealOption(req, res) {
    /*
    Expect a sample json object
    {
      "name": "Meal name",
      "price" "meal price",
      "description": "Meal description",
    }
    */
    var newMeal = req.body;

    var createdMeal = _meal.default.addMeal(newMeal);

    res.status(201).json({
      status: 'Success',
      message: 'Meal option added successfully',
      data: createdMeal
    });
  },
  getAMealOption: function getAMealOption(req, res) {
    var id = req.params.id;

    var foundMeal = _meal.default.getAMeal(id);

    res.status(200).json({
      status: 'Success',
      message: 'Retrieved meal successfully',
      data: foundMeal
    });
  },
  updateAMealOption: function updateAMealOption(req, res) {
    var id = req.params.id;

    var updatedMealOption = _meal.default.updateAMeal(id, req.body);

    res.status(201).json({
      status: 'Success',
      message: 'Meal updated successfully',
      data: updatedMealOption
    });
  },
  deleteAMealOption: function deleteAMealOption(req, res) {
    var id = req.params.id;

    _meal.default.deleteAMealOption(id);

    var result = res.status(204).send({
      status: 'Success',
      message: 'Meal deleted successfully'
    });
    return result;
  }
};
var _default = MealController;
exports.default = _default;
//# sourceMappingURL=meal.controllers.js.map