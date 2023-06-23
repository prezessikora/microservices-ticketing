import { RequestValidationError } from '../errors/RequestValidationError';
import { DatabaseConnectionError } from '../errors/DatabaseConnectionError';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

var jwt = require('jsonwebtoken');

import { User } from '../models/user';
import { BadRequestError } from '../errors/BadRequestError';

const router = express.Router();

router.post(
  '/api/users/singup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be valid'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new BadRequestError('User already exists.');
    }
    const user = User.build({ email: email, password: password });
    await user.save();

    // Generate Jwt

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
    res.status(201).send(user);
  }
);

export { router as signupRouter };
