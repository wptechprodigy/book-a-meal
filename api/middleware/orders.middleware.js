import Joi from 'joi';

class OrderMiddleware {
  static async validateAddToOrder(req, res, next) {
    try {
      const schema = {
        mealId: Joi.number()
          .min(1)
          .required(),
        quantity: Joi.number()
          .min(1)
          .required(),
      };
      await Joi.validate(req.body, schema);
      next();
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: String(error.details[0].message),
        type: 'validation',
      });
    }
    return true;
  }

  static async validateModifyOrder(req, res, next) {
    try {
      const schema = {
        action: Joi.string().required(),
      };
      await Joi.validate(req.body, schema);
      if (!['increase', 'decrease', 'delete'].includes(req.body.action)) {
        throw new Error('Invalid Action Requested');
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

  static async validateOrdeCheckout(req, res, next) {
    try {
      const schema = {
        billingAddress: Joi.string().required(),
      };
      await Joi.validate(req.body, schema);
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
}

export default OrderMiddleware;
