import Joi from 'joi';

class MealMiddleware {
  static async validateAddMealOption(req, res, next) {
    try {
      const schema = {
        name: Joi.string().required(),
        price: Joi.number()
          .min(1)
          .required(),
        description: Joi.string().required(),
      };
      await Joi.validate(req.body, schema);
      if (req.files === null) {
        throw new Error('Meal Image Required');
      }
      const imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!imageMimes.includes(req.files.image.mimetype)) {
        throw new Error('Only JPG, JPEG & PNG Images are allowed');
      }
      next();
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details !== undefined ? error.details[0].message : error.message,
        type: 'validation',
      });
    }
    return true;
  }

  static async validateUpdateAMealOption(req, res, next) {
    try {
      const schema = {
        name: Joi.string(),
        price: Joi.number().min(1),
        description: Joi.string().required(),
      };
      await Joi.validate(req.body, schema);
      if (req.files !== null) {
        const imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!imageMimes.includes(req.files.image.mimetype)) {
          throw new Error('Only JPG, JPEG & PNG Images are allowed');
        }
      }
      next();
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details !== undefined ? error.details[0].message : error.message,
        type: 'validation',
      });
    }
    return true;
  }

  static async validateAddMealToMenu(req, res, next) {
    try {
      const schema = {
        mealId: Joi.number().required(),
      };
      await Joi.validate(req.body, schema);
      next();
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        type: 'validation',
      });
    }
    return true;
  }
}

export default MealMiddleware;
