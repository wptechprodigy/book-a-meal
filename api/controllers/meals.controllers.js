import fs from 'fs';
import Meal from '../models/meals';

class MealController {
  static async addMealOption(req, res) {
    try {
      const { name, price } = req.body;
      const { image } = req.files;
      const imageUrl = `/api/images/${image.name}`;
      const meal = await Meal.create({ name, price, imageUrl, catererId: req.caterer.id });
      await image.mv(`.${imageUrl}`);
      return res.status(201).json({
        status: 'success',
        message: 'Meal option added successfully',
        data: {
          id: meal.id,
          name: meal.name,
          price: meal.price,
          description: meal.description,
          imageUrl: meal.imageUrl,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred, meal not added successfully',
      });
    }
  }

  static async getAMealOption(req, res) {
    try {
      const meal = await Meal.findOne({ where: { id: req.params.id } });
      if (!meal) {
        throw new Error(`Meal With ID ${req.params.id} does not exist`);
      }
      return res.status(200).json({
        status: 'success',
        message: 'Meals retrieved successfully',
        data: meal,
      });

    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Meal could not retrieved',
      });
    }

  }

  static async fetchAllMeals(req, res) {
    try {
      const meals = await Meal.findAll({ where: { catererId: req.caterer.id } });
      return res.status(200).json({
        status: 'success',
        message: 'Meals retrieved successfully',
        data: meals
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Meals could not retrieved',
      });
    }
  }

  static async updateAMealOption(req, res) {
    try {
      const meal = await Meal.findOne({ where: { id: req.params.id } });
      if (!meal) {
        throw new Error(`Meal With ID ${req.params.id} does not exist`);
      }
      const mealUpdate = {
        name: req.body.name ? req.body.name : meal.name,
        price: req.body.price ? req.body.price : meal.price,
        description: req.body.description ? req.body.description : meal.description,
      };
      if (req.files !== null) {
        const { image } = req.files;
        const imageUrl = `/api/images/${image.name}`;
        fs.unlink(`.${meal.imageUrl}`, error => {
          if (error) throw new Error(error.message);
        });
        mealUpdate.imageUrl = imageUrl;
        await image.mv(`.${imageUrl}`);
      } else {
        mealUpdate.imageUrl = meal.imageUrl;
      }
      const { name, price, imageUrl } = mealUpdate;
      await Meal.update({ name, price, imageUrl }, { where: { id: req.params.id } });
      return res.status(200).json({
        status: 'success',
        message: 'Meal updated successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Meal update was not successful',
      });
    }
  }

  static async deleteAMealOption(req, res) {
    try {
      const { id } = req.params;
      const meal = await Meal.findOne({ where: { id } });
      if (!meal) {
        throw new Error(`Meal with ID ${id} does not exist`);
      }
      fs.unlink(`.${meal.imageUrl}`, error => {
        if (error) throw new Error(error.message);
      });
      await meal.destroy();
      return res.status(200).json({
        status: 'success',
        message: 'Meal option deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Meal could not be deleted',
      });
    }
  }
}

export default MealController;
