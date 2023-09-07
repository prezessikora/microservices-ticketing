import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('returns 404 if ticket is not found ', async () => {
  const ticket = await request(app)
    .get('/api/tickets/adad234df')
    .send()
    .expect(404);
});

it('returns ticket if it is found ', async () => {
  const ticketTitle = 'AAA';
  const ticketPrice = 20;
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: ticketTitle,
      price: ticketPrice,
    })
    .expect(201);
  const { id } = response.body;

  const ticket = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(200);

  expect(ticket.body.title).toEqual(ticketTitle);
  expect(ticket.body.price).toEqual(ticketPrice);
});
