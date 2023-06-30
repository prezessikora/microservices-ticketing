import request from 'supertest';
import { app } from '../../app';

it('returns details of the current user', async () => {
  const authResponse = await request(app)
    .post('/api/users/singup')
    .send({
      email: 'test@test.com',
      password: 'asdf',
    })
    .expect(201);

  const cookie = authResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send({})
    .expect(200);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});
