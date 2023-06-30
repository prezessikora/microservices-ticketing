import request from 'supertest';
import { app } from '../../app';

it('fails when a email does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test2@test.com',
      password: 'asdf',
    })
    .expect(400);
});

it('fails when wrong pwd is provided', async () => {
  await request(app)
    .post('/api/users/singup')
    .send({
      email: 'test@test.com',
      password: 'asdf',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'asdf2',
    })
    .expect(400);
});

it('succ when with valid account', async () => {
  await request(app)
    .post('/api/users/singup')
    .send({
      email: 'test@test.com',
      password: 'asdf',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'asdf',
    })
    .expect(200);
});
