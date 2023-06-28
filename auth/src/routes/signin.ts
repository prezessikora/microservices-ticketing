import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { Password } from '../services/password';
import { BadRequestError } from '../errors/BadRequestError';

var jwt = require('jsonwebtoken');
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const passwordMatch = await Password.compare(
        existingUser.password,
        password
      );
      if (passwordMatch) {
        // Generate Jwt
        const user = existingUser;

        const userJwt = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_KEY
        );
        req.session = {
          jwt: userJwt,
        };
        res.status(200).send(user);
      } else {
        throw new BadRequestError('Invalid credentials.');
      }
    } else {
      throw new BadRequestError('Invalid credentials.');
    }
  }
);

export { router as signinRouter };
