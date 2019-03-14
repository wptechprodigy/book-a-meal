import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import secret from '../utils/jwt_secret';
import Caterer from '../models/caterer';

class CatererController {
  static async registerCaterer(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const caterer = await Caterer.create({
        name,
        email,
        phone,
        password: hash,
      });
      const safeCaterer = {
        id: caterer.id,
        name: caterer.name,
        phone: caterer.phone,
        email: caterer.email,
      };
      const jwtToken = jwt.sign({ caterer: safeCaterer }, secret, {
        expiresIn: 86400,
      });
      return res.status(201).json({
        status: 'Success',
        message: 'Registration successful',
        token: `Bearer ${jwtToken}`,
        caterer: safeCaterer,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Registration failed',
      });
    }
  }

  static async loginCaterer(req, res) {
    try {
      const { email, password } = req.body;
      const caterer = await Caterer.findOne({ where: { email } });
      if (!caterer) {
        throw new Error(`Caterer with email: ${email} does not exist`);
      }
      const result = await bcrypt.compare(password, caterer.password);
      if (!result) {
        throw new Error('Password is incorrect, try again!');
      }
      const safeCaterer = {
        id: caterer.id,
        name: caterer.name,
        email: caterer.email,
        phone: caterer.phone,
      };
      const jwtToken = jwt.sign({ caterer: safeCaterer }, secret, {
        expiresIn: 86400,
      });
      return res.status(200).json({
        status: 'Success',
        message: 'Log-in successful',
        token: `Bearer ${jwtToken}`,
        user: safeCaterer,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Login attempt failed',
      });
    }
  }
}

export default CatererController;
