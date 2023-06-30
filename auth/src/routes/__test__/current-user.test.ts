import request from 'supertest';
import { app } from '../../app';

it('returns details of the current user', async () => {
  const cookie = await signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie[0])
    .send({})
    .expect(200);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});
