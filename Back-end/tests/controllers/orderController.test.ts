import request from 'supertest';
import prisma from '../../src/config/database';
import app from '../../src/app'; // Ensure this is your Express app



let createdUser: any;

describe('Order Controller', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.$executeRaw`BEGIN`;
    createdUser = await prisma.user.create({
      data: {
        email: `ordertest-${Date.now()}@gmail.com`,
        password: 'password',
        username: `ordertestuser-${Date.now()}`,
      },
    });
  });

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
  });

  it('should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        userId: createdUser.id,
        status: 'Pending',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(createdUser.id);
    expect(response.body.status).toBe('Pending');
  });

  it('should get all orders', async () => {
    const orderData = {
      userId: createdUser.id,
      status: 'Pending',
    };
    await prisma.order.create({ data: orderData });

    const response = await request(app).get('/api/orders');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.some((order: any) => order.userId === createdUser.id)).toBeTruthy();
  });

  it('should get an order by ID', async () => {
    const orderData = {
      userId: createdUser.id,
      status: 'Pending',
    };
    const createdOrder = await prisma.order.create({ data: orderData });

    const response = await request(app).get(`/api/orders/${createdOrder.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdOrder.id);
    expect(response.body.userId).toBe(createdUser.id);
    expect(response.body.status).toBe('Pending');
  });

  it('should update an order', async () => {
    const orderData = {
      userId: createdUser.id,
      status: 'Pending',
    };
    const createdOrder = await prisma.order.create({ data: orderData });

    const updatedStatus = 'Completed';
    const response = await request(app)
      .put(`/api/orders/${createdOrder.id}`)
      .send({
        status: updatedStatus,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdOrder.id);
    expect(response.body.status).toBe(updatedStatus);
  });

  it('should delete an order', async () => {
    const orderData = {
      userId: createdUser.id,
      status: 'Pending',
    };
    const createdOrder = await prisma.order.create({ data: orderData });

    const response = await request(app).delete(`/api/orders/${createdOrder.id}`);

    expect(response.status).toBe(200);

    const getResponse = await request(app).get(`/api/orders/${createdOrder.id}`);
    expect(getResponse.status).toBe(404);
  });
});
