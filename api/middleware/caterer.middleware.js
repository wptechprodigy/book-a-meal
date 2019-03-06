import Joi from 'joi';
import UserMiddleware from './user.middleware';

class CatererMiddleware extends UserMiddleware {
  static async validateRegisteration(req, res, next) {
    try {
      const schema = {
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        phone: Joi.number()
          .min(11)
          .required(),
        password: Joi.string()
          .min(8)
          .required(),
      };
      await Joi.validate(req.body, schema);
      next();
      return true;
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        type: 'validation'
      });
    }
  }
}

export default CatererMiddleware
