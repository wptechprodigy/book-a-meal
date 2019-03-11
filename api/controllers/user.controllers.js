import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import secret from '../utils/jwt_secret';
import User from '../models/user';

class UserController {
  static async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hash });
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 86400,
      });
      return res.status(201).json({
        status: 'success',
        message: 'Registration successful',
        token: `Bearer ${jwtToken}`,
        user: safeUser,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Registration failed',
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error(`User with email: ${email} cannout be found`);
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        throw new Error('Password does not match');
      }
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 86400,
      });
      return res.status(200).json({
        status: 'success',
        message: 'User Logged In',
        token: `Bearer ${jwtToken}`,
        user: safeUser,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Login failed',
      });
    }
  }
}

export default UserController;
