import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('global signin returns session cookie', async () => {
  const cookie = signin()[0].split('session=')[1];
  const decoded = new Buffer(cookie, 'base64').toString('ascii');
  const webObject = JSON.parse(decoded);
  expect(webObject.jwt).not.toBeNull();
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Ticket Title',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Ticket Title',
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  // add in a check
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Ticket Title',
      price: 20,
    })
    .expect(200);
});
