import request from "supertest";
import prisma from "../../src/config/database";
import app from "../../src/app";


let createdUser: any;

describe("Cart Controller", () => {
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
        email: "TestGmail@gmail.com",
        password: "123456",
        username: "TestUser",
      },
    });
  });

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
  });

  it("should create a new cart", async () => {
    const response = await request(app).post("/api/carts").send({
      userId: createdUser.id,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.userId).toBe(createdUser.id);
  });

  it("should get all carts", async () => {
    await prisma.cart.create({
      data: {
        userId: createdUser.id,
      },
    });

    const response = await request(app).get("/api/carts");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a cart by id", async () => {
    const cart = await prisma.cart.create({
      data: {
        userId: createdUser.id,
      },
    });

    const response = await request(app).get(`/api/carts/${cart.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(cart.id);
    expect(response.body.userId).toBe(createdUser.id);
  });

    it("should update a cart", async () => {
        const cart = await prisma.cart.create({
        data: {
            userId: createdUser.id,
        },
        });
    
        const response = await request(app).put(`/api/carts/${cart.id}`).send({
        userId: createdUser.id,
        });
        expect(response.status).toBe(200);
    });

    it("should delete a cart", async () => {
        const cart = await prisma.cart.create({
        data: {
            userId: createdUser.id,
        },
        });
    
        const response = await request(app).delete(`/api/carts/${cart.id}`);
        expect(response.status).toBe(200);
    });

    
});
