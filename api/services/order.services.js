import dummyDBData from '../utils/dummyDBData';
// import Meal from '../models/meal.models';
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
    const { mealId, quantity } = order;
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
    const ordered = {
      orderedMeal,
      quantity,
    };
    return ordered || {};
  },
  updateOrder(id, data) {
    const alreadyordered = dummyDBData.orders.find(order => order.mealId === Number(id));
    const index = dummyDBData.orders.indexOf(alreadyordered);
    dummyDBData.orders[index].mealId = data.mealId || alreadyordered.mealId;
    dummyDBData.orders[index].quantity = data.quantity || alreadyordered.quantity;
    return dummyDBData.orders[index];
  },
  deleteOrder(id) {
    const toBeDeletedOrder = dummyDBData.orders.find(order => order.mealId === Number(id));
    const index = dummyDBData.orders.indexOf(toBeDeletedOrder);
    dummyDBData.meals.splice(index, 1);
    return {};
  },
};

export default OrderService;
