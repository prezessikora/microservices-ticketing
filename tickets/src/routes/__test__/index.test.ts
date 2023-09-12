import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket, TicketAttrs } from '../../models/ticket';

it('Returns all tickets', async () => {
  const tickets = [
    { title: 'AAA', price: 20 },
    { title: 'BBB', price: 25 },
    { title: 'CCC', price: 225 },
  ];
  for (let i = 0; i < tickets.length; i++) {
    let t = tickets[i];
    const ticket = Ticket.build({
      title: t.title,
      price: t.price,
      userId: '123',
    });
    await ticket.save();
  }

  const ticketsResponse = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);
  const allTickets: [TicketAttrs] = ticketsResponse.body;
  expect(allTickets.length).toEqual(tickets.length);
  for (let i = 0; i < tickets.length; i++) {
    expect(tickets[i].title).toEqual(allTickets[i].title);
    expect(tickets[i].price).toEqual(allTickets[i].price);
  }
});
