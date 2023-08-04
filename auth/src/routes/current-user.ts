import express from 'express';
import { json } from 'body-parser';
import { Request, Response } from 'express';
import { currentUser } from '@prezestickets/common';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  (req: Request, res: Response) => {
    return res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
