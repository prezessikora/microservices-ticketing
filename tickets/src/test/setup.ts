import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
var jwt = require('jsonwebtoken');

import request from 'supertest';
import { app } from '../app';

let mongo: any;

declare global {
  var signin: () => string[];
}

beforeAll(async () => {
  process.env.JWT_KEY = 'aaa';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  // Build a JWT payload {id, email}

  const paylod = {
    id: '123',
    email: 'test@test.com',
  };
  // Create json web token
  const userJwt = jwt.sign(paylod, process.env.JWT_KEY);
  // Build JSON web object {jwt: MY_JWT}
  let sesssion = { jwt: userJwt };

  // turn it into JSON
  let sessionJSON = JSON.stringify(sesssion);
  // encode in base64 and return
  const base64 = Buffer.from(sessionJSON).toString('base64');
  return [`session=${base64}`];
};
