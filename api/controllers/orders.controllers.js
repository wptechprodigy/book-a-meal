import Order from '../models/orders';
// import OrderItem from '../models/orderItem';
import Meal from '../models/meals';
// import Menu from '../models/menus';

class OrderController {
  static async addAnOrder(req, res) {
    try {
      const { mealId, quantity } = req.body;
      const orderItem = await Order.findOne({ where: { mealId, userId: req.user.id } });
      const response = {};
      if (orderItem) {
        response.body = {
          status: 'warning',
          message: 'Meal already ordered',
        };
      } else {
        const newOrderItem = await Order.create({ mealId, quantity, userId: req.user.id });
        response.body = {
          status: 'success',
          message: 'Meal added to orders successfully',
          data: newOrderItem,
        };
      }
      return res.status(201).json(response.body);
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Meal not successfully added',
      });
    }
  }

  static async getAllMealsOrderedFromACaterer(req, res) {
    try {
      const orders = await Order.findAll({ where: { catererId: req.caterer.id } });
      return res.status(200).json({
        status: 'success',
        message: 'Orders retrieved successfully',
        data: orders,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'orders retrieval failed',
      });
    }
  }

  static async getOrdersByUser(req, res) {
    try {
      const orderedMeals = await Order.findAll({
        where: { userId: req.user.id },
        include: [Meal],
      });
      if (!orderedMeals) {
        throw new Error('User has no ordered items');
      }
      const meals = [];
      let total = 0;
      const orderItems = {};
      orderItems.forEach((orderItem) => {
        const orderMeal = { ...orderItem };
        orderMeal.meal.quantity = orderItem.quantity;
        meals.push(orderMeal.meal);
        total += orderItem.quantity * orderMeal.meal.price;
      });
      const order = { meals, total };
      return res.status(200).json({
        status: 'success',
        message: 'Orders retrieved successfully',
        data: order,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Orders retrieval failed',
      });
    }
  }

  static async modifyOrder(req, res) {
    try {
      const { orderId } = req.params;
      const { action } = req.body;
      const orderItem = await Order.findOne({
        where: { id: orderId, userId: req.user.id },
        include: [Meal],
      });
      if (action === 'increase') {
        orderItem.quantity += 1;
        if (orderItem.quantity > orderItem.meal.quantity) {
          throw new Error(
            `Only ${orderItem.meal.quantity} servings of ${orderItem.meal.name} is available`,
          );
        }
        await Order.update({ quantity: orderItem.quantity }, { where: { id: orderItem.id } });
      } else if (action === 'decrease') {
        orderItem.quantity -= 1;
        if (orderItem.quantity === 0) {
          await Order.destroy({ where: { id: orderItem.id } });
        } else {
          await Order.update({ quantity: orderItem.quantity }, { where: { id: orderItem.id } });
        }
      } else if (action === 'delete') {
        await Order.destroy({ where: { id: orderItem.id } });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Order Updated',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Order could not be modified this time.',
      });
    }
  }
}

export default OrderController;
