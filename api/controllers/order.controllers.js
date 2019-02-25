// import MealService from '../services/meal.services';
import OrderService from '../services/order.services';

const OrderController = {
  fetchAllOrders(req, res) {
    const allOrders = OrderService.fetchOrders();
    res.status(200).json({
      status: 'Success',
      message: 'All orders retrieved successfully',
      data: allOrders,
    });
  },
  addAnOrder(req, res) {
    /*
    Expect a sample json object
    {
      "mealId": mealID here should be the same with product Id
      "quantity" 1,
    }
    */
    const newOrder = req.body;
    const createdOrder = OrderService.addOrder(newOrder);
    res.status(201).json({
      status: 'Success',
      message: 'Order added successfully',
      data: createdOrder,
    });
  },
  getAnOrder(req, res) {
    const { mealId } = req.params;
    const foundOrder = OrderService.getOrder(mealId);
    res.status(200).json({
      status: 'Success',
      message: 'Order retrieved successfully',
      data: foundOrder,
    });
  },
  updateAnOrder(req, res) {
    const { mealId } = req.params;
    const updatedOrder = OrderService.updateOrder(mealId, req.body);
    res.status(201).json({
      status: 'Success',
      message: 'Order updated successfully',
      data: updatedOrder,
    });
  },
  deleteAnOrder(req, res) {
    const { id } = req.params;
    OrderService.deleteOrder(id);
    return res.status(204).json({
      status: 'Success',
      message: 'Order deleted successfully',
    });
  },
};

export default OrderController;
