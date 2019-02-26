"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menu = _interopRequireDefault(require("../services/menu.services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuController = {
  fetchAllMenus: function fetchAllMenus(req, res) {
    var allMenus = _menu.default.fetchMenus();

    res.status(200).json({
      status: 'Success',
      message: 'All menus were retrieved successfully',
      data: allMenus
    });
  },
  addAMealOption: function addAMealOption(req, res) {
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
    var newMealOption = req.body;

    var createdMenu = _menu.default.addAMealOption(newMealOption);

    res.status(201).json({
      status: 'Success',
      message: 'Meal option added to menu successfully',
      data: createdMenu
    });
  },
  getMenuForADay: function getMenuForADay(req, res) {
    var availableOn = req.params.availableOn;

    var foundMenu = _menu.default.getMenuForParticularDay(availableOn);

    res.status(200).json({
      status: 'Success',
      message: 'Menu retrieved successfully',
      data: foundMenu || {}
    });
  }
};
var _default = MenuController;
exports.default = _default;
//# sourceMappingURL=menu.controllers.js.map