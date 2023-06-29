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
