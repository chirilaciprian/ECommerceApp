import request from "supertest";
import prisma from "../../src/config/database";
import app from "../../src/app"; // Ensure this is your Express app

describe("User Controller", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.$executeRaw`BEGIN`;
  });
  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
  });

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        email: `testuser-${Date.now()}@gmail.com`,
        password: "password",
        confirm_password: "password",
        username: `testuser-${Date.now()}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toMatch(/testuser/);
    expect(response.body.username).toMatch(/testuser/);
  });

  it("should get all users", async () => {
    const userData = {
      email: `testuser-${Date.now()}@gmail.com`,
      password: "password",
      username: `testuser-${Date.now()}`,
    };
    await prisma.user.create({ data: userData });

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(
      response.body.some((user: any) => user.email === userData.email)
    ).toBeTruthy();
  });

  it("should get a user by ID", async () => {
    const userData = {
      email: `testuser-${Date.now()}@gmail.com`,
      password: "password",
      username: `testuser-${Date.now()}`,
    };
    const createdUser = await prisma.user.create({ data: userData });

    const response = await request(app).get(`/api/users/${createdUser.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdUser.id);
    expect(response.body.email).toBe(userData.email);
    expect(response.body.username).toBe(userData.username);
  });

  it("should update a user", async () => {
    const userData = {
      email: `testuser-${Date.now()}@gmail.com`,
      password: "password",
      username: `testuser-${Date.now()}`,
    };
    const createdUser = await prisma.user.create({ data: userData });

    const updatedEmail = `updateduser-${Date.now()}@gmail.com`;
    const updatedUsername = `updateduser-${Date.now()}`;
    const response = await request(app)
      .put(`/api/users/${createdUser.id}`)
      .send({
        ...createdUser,
        email: updatedEmail,
        username: updatedUsername,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdUser.id);
    expect(response.body.email).toBe(updatedEmail);
    expect(response.body.username).toBe(updatedUsername);
  });

  it("should delete a user", async () => {
    const userData = {
      email: `testuser-${Date.now()}@gmail.com`,
      password: "password",
      username: `testuser-${Date.now()}`,
    };
    const createdUser = await prisma.user.create({ data: userData });

    const response = await request(app).delete(`/api/users/${createdUser.id}`);

    expect(response.status).toBe(200);

    const getResponse = await request(app).get(`/api/users/${createdUser.id}`);
    expect(getResponse.status).toBe(404);
  });
});
