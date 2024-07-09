import request from 'supertest';
import prisma from '../../src/config/database';
import app from '../../src/app'; // Ensure this is your Express app



let createdCategory: any;

describe('Product Controller', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {

    await prisma.$executeRaw`BEGIN`;
    createdCategory = await prisma.category.create({
      data: {
        name: `CategoryTest-${Date.now()}`,
      },
    });
  });

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
  });

  it('should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: `Sample product-${Date.now()}`,
        price: 10,
        image: 'http://example.com/image.png',
        categoryId: createdCategory.id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');    
    expect(response.body.price).toBe(10);
    expect(response.body.image).toBe('http://example.com/image.png');
    expect(response.body.categoryId).toBe(createdCategory.id);
  });

  it('should get all products', async () => {
    const productName = `Sample product-${Date.now()}`;
    await prisma.product.create({
      data: {
        name: productName,
        price: 10,
        image: 'imageUrl',
        categoryId: createdCategory.id,
      },
    });

    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.some((product: any) => product.name === productName)).toBeTruthy();
  });

  it('should get a product by ID', async () => {
    const productName = `Sample product-${Date.now()}`;
    const createdProduct = await prisma.product.create({
      data: {
        name: productName,
        price: 10,
        image: 'imageUrl',
        categoryId: createdCategory.id,
      },
    });

    const response = await request(app).get(`/api/products/${createdProduct.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdProduct.id);
    expect(response.body.name).toBe(productName);
    expect(response.body.price).toBe(10);
    expect(response.body.image).toBe('imageUrl');
    expect(response.body.categoryId).toBe(createdCategory.id);
  });

  it('should update a product', async () => {
    const productName = `Sample product-${Date.now()}`;
    const createdProduct = await prisma.product.create({
      data: {
        name: productName,
        price: 10,
        image: 'http://example.com/image.png',
        categoryId: createdCategory.id,
      },
    });

    const updatedProductName = `Updated product-${Date.now()}`;
    const response = await request(app)
      .put(`/api/products/${createdProduct.id}`)
      .send({
        name: updatedProductName,
        price: 20,
        image: 'http://example2.com/image.png',
        categoryId: createdCategory.id,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdProduct.id);
    expect(response.body.name).toBe(updatedProductName);
    expect(response.body.price).toBe(20);
    expect(response.body.image).toBe('http://example2.com/image.png');
    expect(response.body.categoryId).toBe(createdCategory.id);
  });

  it('should delete a product', async () => {
    const productName = `Sample product-${Date.now()}`;
    const createdProduct = await prisma.product.create({
      data: {
        name: productName,
        price: 10,
        image: 'imageUrl',
        categoryId: createdCategory.id,
      },
    });

    const response = await request(app).delete(`/api/products/${createdProduct.id}`);

    expect(response.status).toBe(200);

    const getResponse = await request(app).get(`/api/products/${createdProduct.id}`);
    expect(getResponse.status).toBe(404);
  });
});
