"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyDBData = _interopRequireDefault(require("../utils/dummyDBData"));

var _menu = _interopRequireDefault(require("../models/menu.models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuService = {
  fetchMenus: function fetchMenus() {
    var validMenus = _dummyDBData.default.menus.map(function (menu) {
      var newMenu = new _menu.default();
      newMenu.availableOn = menu.availableOn;
      newMenu.mealOptions = menu.mealOptions;
      return newMenu;
    });

    return validMenus;
  },
  addAMealOption: function addAMealOption(newMealOption) {
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
    var addedOn = newMealOption.availableOn;
    var mealOptionArr = []; // const menuKeys = Object.keys(menus);

    var menuToAdd = _dummyDBData.default.menus.map(function (menu) {
      var dateExisted = menu.availableOn;

      var selectedMeal = _dummyDBData.default.meals.find(function (mealOption) {
        return mealOption.id === newMealOption.mealOption.id;
      });

      var newMeal = dateExisted === addedOn ? (menu.mealOptions.push(selectedMeal), {
        availableOn: dateExisted,
        mealOption: selectedMeal
      }) : (mealOptionArr.push(selectedMeal), _dummyDBData.default.menus.push({
        availableOn: addedOn,
        mealOptions: mealOptionArr
      }), {
        availableOn: addedOn,
        mealOption: mealOptionArr
      });
      return newMeal;
    });

    return menuToAdd;
  },
  getMenuForParticularDay: function getMenuForParticularDay(availableOn) {
    var menuForAParticularDay = _dummyDBData.default.menus.find(function (menu) {
      return menu.availableOn === availableOn;
    });

    return menuForAParticularDay || {};
  }
};
var _default = MenuService;
exports.default = _default;
//# sourceMappingURL=menu.services.js.map