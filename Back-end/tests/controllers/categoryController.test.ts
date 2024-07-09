import request from "supertest";
import prisma from "../../src/config/database";
import app from "../../src/app";

describe("Category Controller", () => {
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

  it("should create a new category", async () => {
    const response = await request(app).post("/api/categories").send({
      name: "Category 3",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Category 3");
  });

  it("should get all categories", async () => {    
    await prisma.category.create({
      data: {
        name: "Category 1",
      },
    });

    const response = await request(app).get("/api/categories");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a category by id", async () => {
    const category = await prisma.category.create({
      data: {
        name: "Category 4",
      },
    });

    const response = await request(app).get(`/api/categories/${category.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(category.id);
    expect(response.body.name).toBe("Category 4");
  });

  it("should update a category", async () => {
    const category = await prisma.category.create({
      data: {
        name: "Category 5",
      },
    });

    const response = await request(app)
      .put(`/api/categories/${category.id}`)
      .send({
        name: "Category 6",
      });
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(category.id);
    expect(response.body.name).toBe("Category 6");
  });

  it("should delete a category", async () => {
    const category = await prisma.category.create({
      data: {
        name: "Category 7",
      },
    });

    const response = await request(app).delete(
      `/api/categories/${category.id}`
    );
    expect(response.status).toBe(200);
  });
});
