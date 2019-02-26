# Book-A-Meal [![Build Status](https://travis-ci.org/wptechprodigy/book-a-meal.svg?branch=develop)](https://travis-ci.org/wptechprodigy/book-a-meal) [![Coverage Status](https://coveralls.io/repos/github/wptechprodigy/book-a-meal/badge.svg?branch=develop)](https://coveralls.io/github/wptechprodigy/book-a-meal?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/e7a3cc1fc81097a577d8/maintainability)](https://codeclimate.com/github/wptechprodigy/book-a-meal/maintainability)

## Book-A-Meal API Endpoints

#### How To Use & Test The API

- Clone or download the project repo using `git clone <project-url>`
- `cd book-a-meal` to switch to the project directory
- Run `npm install` to install all project dependencies
- To run test, simply run `npm test`
- To start testing the endpoints, run `npm run start-dev`

### The API is handling the following endpoints:

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

    ```
-
````
