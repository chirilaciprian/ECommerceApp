import request from 'supertest';
import prisma from '../../src/config/database';
import app from '../../src/app'; // Ensure this is your Express app





let createdCategory: any;
let createdProduct: any;
let createdUser: any;
let createdCart: any;

describe('CartItem Controller', () => {
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
        email: `testgmail-${Date.now()}@gmail.com`,
        password: 'password',
        username: `cartItemTestUser-${Date.now()}`,
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

    createdCart = await prisma.cart.create({
      data: {
        userId: createdUser.id,
      },
    });
  });

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
  });

  it('should create a new cart item', async () => {
    const response = await request(app)
      .post('/api/cartItems')
      .send({
        quantity: 1,
        cartId: createdCart.id,
        productId: createdProduct.id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.quantity).toBe(1);
    expect(response.body.productId).toBe(createdProduct.id);
    expect(response.body.cartId).toBe(createdCart.id);
  });

  it('should get all cart items', async () => {
    await prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: createdCart.id,
        productId: createdProduct.id,
      },
    });

    const response = await request(app).get('/api/cartItems');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.some((item: any) => item.cartId === createdCart.id)).toBeTruthy();
  });

  it('should get a cart item by ID', async () => {
    const createdCartItem = await prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: createdCart.id,
        productId: createdProduct.id,
      },
    });

    const response = await request(app).get(`/api/cartItems/${createdCartItem.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdCartItem.id);
    expect(response.body.quantity).toBe(1);
    expect(response.body.productId).toBe(createdProduct.id);
    expect(response.body.cartId).toBe(createdCart.id);
  });

  it('should update a cart item quantity', async () => {
    const createdCartItem = await prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: createdCart.id,
        productId: createdProduct.id,
      },
    });

    const response = await request(app)
      .put(`/api/cartItems/${createdCartItem.id}/quantity`)
      .send({
        quantity: 2,
      });

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(2);
  });

  it('should delete a cart item', async () => {
    const createdCartItem = await prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: createdCart.id,
        productId: createdProduct.id,
      },
    });

    const response = await request(app).delete(`/api/cartItems/${createdCartItem.id}`);

    expect(response.status).toBe(200);

    const getResponse = await request(app).get(`/api/cartItems/${createdCartItem.id}`);
    expect(getResponse.status).toBe(404);
  });
});
