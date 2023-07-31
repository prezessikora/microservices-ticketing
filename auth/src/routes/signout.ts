import express from 'express';
import { json } from 'body-parser';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  console.log('Singing out ...');
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
