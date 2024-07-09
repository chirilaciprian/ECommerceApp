import request from 'supertest';
import prisma from '../../src/config/database';
import app from '../../src/app'; // Ensure this is your Express app




let createdUser: any;
let createdOrder: any;
let createdCategory: any;
let createdProduct: any;

describe('OrderItem Controller', () => {
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
        email: `orderitemtest-${Date.now()}@gmail.com`,
        password: 'password',
        username: `orderitemtestuser-${Date.now()}`,
      },
    });

    createdOrder = await prisma.order.create({
      data: {
        userId: createdUser.id,
        status: 'Pending',
      },
    });

    createdCategory = await prisma.category.create({
      data: {
        name: `CategoryTest-${Date.now()}`,
      },
    });

    createdProduct = await prisma.product.create({
      data: {
        name: `Sample product-${Date.now()}`,
        price: 10,
        image: 'imageUrl',
        categoryId: createdCategory.id,
      },
    });
  });

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
  });

  it('should create a new order item', async () => {
    const response = await request(app)
      .post('/api/orderItems')
      .send({
        orderId: createdOrder.id,
        productId: createdProduct.id,
        quantity: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.quantity).toBe(1);
    expect(response.body.productId).toBe(createdProduct.id);
    expect(response.body.orderId).toBe(createdOrder.id);
  });

  it('should get all order items', async () => {
    await prisma.orderItem.create({
      data: {
        orderId: createdOrder.id,
        productId: createdProduct.id,
        quantity: 1,
      },
    });

    const response = await request(app).get('/api/orderItems');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.some((item: any) => item.orderId === createdOrder.id)).toBeTruthy();
  });

  it('should get an order item by ID', async () => {
    const createdOrderItem = await prisma.orderItem.create({
      data: {
        orderId: createdOrder.id,
        productId: createdProduct.id,
        quantity: 1,
      },
    });

    const response = await request(app).get(`/api/orderItems/${createdOrderItem.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdOrderItem.id);
    expect(response.body.quantity).toBe(1);
    expect(response.body.productId).toBe(createdProduct.id);
    expect(response.body.orderId).toBe(createdOrder.id);
  });

  it("should update order item's quantity", async () => {
    const createdOrderItem = await prisma.orderItem.create({
      data: {
        orderId: createdOrder.id,
        productId: createdProduct.id,
        quantity: 1,
      },
    });

    const response = await request(app)
      .put(`/api/orderItems/${createdOrderItem.id}/quantity`)
      .send({
        quantity: 2,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdOrderItem.id);
    expect(response.body.quantity).toBe(2);
    expect(response.body.productId).toBe(createdProduct.id);
    expect(response.body.orderId).toBe(createdOrder.id);
  });

  it('should delete an order item', async () => {
    const createdOrderItem = await prisma.orderItem.create({
      data: {
        orderId: createdOrder.id,
        productId: createdProduct.id,
        quantity: 1,
      },
    });

    const response = await request(app).delete(`/api/orderItems/${createdOrderItem.id}`);

    expect(response.status).toBe(204);

    const getResponse = await request(app).get(`/api/orderItems/${createdOrderItem.id}`);
    expect(getResponse.status).toBe(404);
  });
});
