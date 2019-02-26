# Book-A-Meal [![Build Status](https://travis-ci.org/wptechprodigy/book-a-meal.svg?branch=develop)](https://travis-ci.org/wptechprodigy/book-a-meal) [![Coverage Status](https://coveralls.io/repos/github/wptechprodigy/book-a-meal/badge.svg?branch=develop)](https://coveralls.io/github/wptechprodigy/book-a-meal?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/e7a3cc1fc81097a577d8/maintainability)](https://codeclimate.com/github/wptechprodigy/book-a-meal/maintainability)

## Book-A-Meal API Endpoints

#### How To Use & Test The API

- Clone or download the project repo using `git clone <project-url>`
- `cd book-a-meal` to switch to the project directory
- Run `npm install` to install all project dependencies
- To run test, simply run `npm test`
- To start testing the endpoints, run `npm run start-dev`

### The API is handling the following endpoints:

### Testing the Meal Route

#### /GET Route (To get all meals)

- append `/api/v1/meals` to the base url.
- The base url could be either `localhost:9000` (when running locally);
- Or to `https://book-a-meal-waheed.herokuapp.com/` when on heroku

#### /GET/2 Route (To get a meal with `id = 2`)

- append `/api/v1/meals/2` to the base url.

#### /POST Route (To get POST a meal)

Use the dummy data below to run a /POST test to `/api/v1/meals` attached to the base url

````
    {
      id: 5,
      name: 'Jollof rice with Fish',
      price: '350',
      description: 'A little description',
    }
````
#### /PUT Route (To update a meal by its mealId)
- append `/api/v1/meals/2` to update the meal with mealId 2

 ````
    {
        name: 'Iyan with efo-riro',
        price: '450', // There's an update in the price
        description: 'A little more description', // As well as in the descritpio
    }
````
You should get a success with a message informing you of the update.
#### /DELETE Route (To delete a meal by its mealId)
- append `/api/v1/meals/2` to the base url.

### Testing the Menu Route

#### /GET Route (To get all menus)

- append `/api/v1/menus` to the base url.
- The base url could be either `localhost:9000` (when running locally);
- Or to `https://book-a-meal-waheed.herokuapp.com/` when on heroku

#### /GET/:availableOn Route (To get the menu available on a particular day/date)

- append `/api/v1/meals/26-02-19` to the base url.
- `26-02-19` is query string to be added to get the menu available on that day

#### /POST Route (To get POST a menu)

Use the dummy data below to run a /POST test to `/api/v1/meals` attached to the base url

````
    {
      availableOn: '27-02-19',
      mealOption: {
          id: 5,
          name: 'Jollof rice with Fish',
          price: '350',
          description: 'A little description',
        }
    }
````
- It should return a body of message with success, message and the meal option available

### Testing the Order Route

#### /GET Route (To get all orders)

- append `/api/v1/orders` to the base url.
This should return all orders

#### /GET/2 Route (To get a meal with `mealId = 2`)

- append `/api/v1/orders/2` to the base url.
This should return the ordered meal with the mealId, meal option and quantity ordered

#### /POST Route (To get POST a meal)

Use the dummy data below to run a /POST test to `/api/v1/orders` attached to the base url

````
    {
        mealId: 2,
        quantity: 5,
    }
````
This return a success message with status code and the meal ordered

#### /PUT Route (To update an order)
- append `/api/v1/orders/2` to update the order and GET it
- then Update the quantity or mealId
You should get a success with a message informing you of the update.

#### /DELETE Route (To delete an order)
- append `/api/v1/orders/2` to the base url.


