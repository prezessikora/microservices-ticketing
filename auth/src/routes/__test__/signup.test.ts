import request from 'supertest';
import { app } from '../../app';

it('returns 201 on succ signup', async () => {
  return request(app)
    .post('/api/users/singup')
    .send({
      email: 'test@test.com',
      password: 'asdf',
    })
    .expect(201);
});

it('returns 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/singup')
    .send({
      email: 'testtest.com',
      password: 'asdf',
    })
    .expect(400);
});

it('returns 400 with invalid pwd', async () => {
  return request(app)
    .post('/api/users/singup')
    .send({
      email: 'testtest.com',
      password: 'p',
    })
    .expect(400);
});

it('returns 400 with missing email and pwd', async () => {
  await request(app)
    .post('/api/users/singup')
    .send({
      email: 'test@test.pl',
    })
    .expect(400);

  await request(app)
    .post('/api/users/singup')
    .send({
      password: '1',
    })
    .expect(400);
});

it('disallows same emails', async () => {
  await request(app)
    .post('/api/users/singup')
    .send({
      email: 'test@test.pl',
      password: 'asdfg',
    })
    .expect(201);

  await request(app)
    .post('/api/users/singup')
    .send({
      email: 'test@test.pl',
      password: 'asdfg',
    })
    .expect(400);
});
