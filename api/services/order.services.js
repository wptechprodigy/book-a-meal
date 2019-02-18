import dummyDBData from '../utils/dummyDBData';
import Meal from '../models/meal.models';
import Order from '../models/order.models';

const OrderService = {
  fetchOrders() {
    const validOrders = dummyDBData.orders.map((order) => {
      const newOrder = new Order();
      newOrder.mealId = order.mealId;
      newOrder.quantity = order.quantity;
      return newOrder;
    });
    return validOrders;
  },
  addOrder(order) {
    // get id of meal
    // assign it to mealId
    // pass it along as an order with meal details
    const orderedID = order.id;
    const mealId = dummyDBData.meals.push(orderedID);
    // const mealId = dummyDBData.meals[0];
    const { quantity } = dummyDBData.orders;
    dummyDBData.orders.push({
      mealId,
      quantity,
    });
    return order;
  },
  getOrder(id) {
    const orderedMeal = dummyDBData.meals.find(meal => meal.id === Number(id));
    const orderedQuantity = dummyDBData.orders.find(order => order.mealId === Number(id));
    const { quantity } = orderedQuantity;
    const order = {
      orderedMeal,
      quantity,
    };
    return order || {};
  },
  updateOrder(id, data) {
    const order = dummyDBData.orders.find(order => order.mealId === Number(id));
    const index = dummyDBData.orders.indexOf(order);
    dummyDBData.orders[index].mealId = data.mealId || order.mealId;
    dummyDBData.orders[index].quantity = data.quantity || order.quantity;
    return dummyDBData.orders[index];
  },
  deleteOrder(id) {
    const order = dummyDBData.orders.find(order => order.mealId === Number(id));
    const index = dummyDBData.orders.indexOf(order);
    dummyDBData.meals.splice(index, 1);
    return {};
  },
};

export default OrderService;
