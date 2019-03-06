import jwt from 'jsonwebtoken';
import secret from '../utils/jwt_secret';

class AuthController {
  static checkForToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No Token was Provided',
      });
    }
    const jwtToken = token.split(' ')[1];
    req.jwt = jwtToken;
    next();
    return true;
  }

  static async verifyUserToken(req, res, next) {
    try {
      const decoded = await jwt.verify(req.jwt, secret);
      req.user = decoded.user;
      next();
      return true;
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid Auth Token',
      });
    }
  }

  static async verifyAdminToken(req, res, next) {
    try {
      const decoded = await jwt.verify(req.jwt, secret);
      // if (!decoded.isCaterer) {
      //   throw new Error('Unauthorized');
      // }
      req.caterer = decoded.caterer;
      next();
      return true;
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: 'You are unauthorized',
      });
    }
  }
}

export default AuthController;
