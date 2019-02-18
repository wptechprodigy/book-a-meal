import moment from 'moment';

export default {
  meals: [
    {
      id: 1,
      name: 'Amala with gbegiri',
      price: '450',
      description: 'A little description',
    },
    {
      id: 2,
      name: 'Iyan with efo-riro',
      price: '550',
      description: 'A little description',
    },
    {
      id: 3,
      name: 'Jollof rice with salad',
      price: '300',
      description: 'A little description',
    },
    {
      id: 4,
      name: 'Salad with plantain',
      price: '350',
      description: 'A little description',
    },
  ],
  menus: [
    {
      availableOn: moment.now(),
      mealOptions: [],
    },
  ],
  orders: [
    {
      mealId: 1,
      quantity: 1,
    },
    {
      mealId: 2,
      quantity: 2,
    },
    {
      mealId: 4,
      quantity: 1,
    },
  ],
};
