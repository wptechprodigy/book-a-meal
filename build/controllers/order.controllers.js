"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _order = _interopRequireDefault(require("../services/order.services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import MealService from '../services/meal.services';
var OrderController = {
  fetchAllOrders: function fetchAllOrders(req, res) {
    var allOrders = _order.default.fetchOrders();

    res.status(200).json({
      status: 'Success',
      message: 'All orders retrieved successfully',
      data: allOrders
    });
  },
  addAnOrder: function addAnOrder(req, res) {
    /*
    Expect a sample json object
    {
      "mealId": mealID here should be the same with product Id
      "quantity" 1,
    }
    */
    var newOrder = req.body;

    var createdOrder = _order.default.addOrder(newOrder);

    res.status(201).json({
      status: 'Success',
      message: 'Order added successfully',
      data: createdOrder
    });
  },
  getAnOrder: function getAnOrder(req, res) {
    var mealId = req.params.mealId;

    var foundOrder = _order.default.getOrder(mealId);

    res.status(200).json({
      status: 'Success',
      message: 'Order retrieved successfully',
      data: foundOrder
    });
  },
  updateAnOrder: function updateAnOrder(req, res) {
    var mealId = req.params.mealId;

    var updatedOrder = _order.default.updateOrder(mealId, req.body);

    res.status(201).json({
      status: 'Success',
      message: 'Order updated successfully',
      data: updatedOrder
    });
  },
  deleteAnOrder: function deleteAnOrder(req, res) {
    var id = req.params.id;

    _order.default.deleteOrder(id);

    return res.status(204).json({
      status: 'Success',
      message: 'Order deleted successfully'
    });
  }
};
var _default = OrderController;
exports.default = _default;
//# sourceMappingURL=order.controllers.js.map