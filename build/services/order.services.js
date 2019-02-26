"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyDBData = _interopRequireDefault(require("../utils/dummyDBData"));

var _order = _interopRequireDefault(require("../models/order.models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Meal from '../models/meal.models';
var OrderService = {
  fetchOrders: function fetchOrders() {
    var validOrders = _dummyDBData.default.orders.map(function (order) {
      var newOrder = new _order.default();
      newOrder.mealId = order.mealId;
      newOrder.quantity = order.quantity;
      return newOrder;
    });

    return validOrders;
  },
  addOrder: function addOrder(order) {
    // get id of meal
    // assign it to mealId
    // pass it along as an order with meal details
    var mealId = order.mealId,
        quantity = order.quantity;

    _dummyDBData.default.orders.push({
      mealId: mealId,
      quantity: quantity
    });

    return order;
  },
  getOrder: function getOrder(id) {
    var orderedMeal = _dummyDBData.default.meals.find(function (meal) {
      return meal.id === Number(id);
    });

    var orderedQuantity = _dummyDBData.default.orders.find(function (order) {
      return order.mealId === Number(id);
    });

    var quantity = orderedQuantity.quantity;
    var ordered = {
      orderedMeal: orderedMeal,
      quantity: quantity
    };
    return ordered || {};
  },
  updateOrder: function updateOrder(id, data) {
    var alreadyordered = _dummyDBData.default.orders.find(function (order) {
      return order.mealId === Number(id);
    });

    var index = _dummyDBData.default.orders.indexOf(alreadyordered);

    _dummyDBData.default.orders[index].mealId = data.mealId || alreadyordered.mealId;
    _dummyDBData.default.orders[index].quantity = data.quantity || alreadyordered.quantity;
    return _dummyDBData.default.orders[index];
  },
  deleteOrder: function deleteOrder(id) {
    var toBeDeletedOrder = _dummyDBData.default.orders.find(function (order) {
      return order.mealId === Number(id);
    });

    var index = _dummyDBData.default.orders.indexOf(toBeDeletedOrder);

    _dummyDBData.default.meals.splice(index, 1);

    return {};
  }
};
var _default = OrderService;
exports.default = _default;
//# sourceMappingURL=order.services.js.map