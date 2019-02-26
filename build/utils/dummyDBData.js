"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  meals: [{
    id: 1,
    name: 'Amala with gbegiri',
    price: '450',
    description: 'A little description'
  }, {
    id: 2,
    name: 'Iyan with efo-riro',
    price: '550',
    description: 'A little description'
  }, {
    id: 3,
    name: 'Jollof rice with salad',
    price: '300',
    description: 'A little description'
  }, {
    id: 4,
    name: 'Salad with plantain',
    price: '350',
    description: 'A little description'
  }],
  menus: [{
    availableOn: (0, _moment.default)().format('DD-MM-YY'),
    mealOptions: [{
      id: 1,
      name: 'Amala with gbegiri',
      price: '450',
      description: 'A little description'
    }, {
      id: 2,
      name: 'Iyan with efo-riro',
      price: '550',
      description: 'A little description'
    }]
  }],
  orders: [{
    mealId: 1,
    quantity: 1
  }, {
    mealId: 2,
    quantity: 2
  }, {
    mealId: 4,
    quantity: 1
  }]
};
exports.default = _default;
//# sourceMappingURL=dummyDBData.js.map