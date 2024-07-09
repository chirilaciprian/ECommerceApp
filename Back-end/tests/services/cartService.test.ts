import prisma from "../../src/config/database";
import * as cartService from "../../src/services/cartService";

let createdUser: any;

describe("cartService", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
  });

  beforeEach(async () => {
    await prisma.$executeRaw`BEGIN`;
    createdUser = await prisma.user.create({
      data: {
        email: `cartTest-${Date.now()}@gmail.com`,
        password: "password",
        username: `cartTestUser-${Date.now()}`,
      },
    });
  });

  it("should create a cart", async () => {
    const createdCart = await cartService.createCart({
      userId: createdUser.id,
    });
    expect(createdCart).toHaveProperty("id");
    expect(createdCart.userId).toBe(createdUser.id);
  });

  it("should get a cart by id", async () => {
    const createdCart = await cartService.createCart({
      userId: createdUser.id,
    });
    const cart = await cartService.getCartById(createdCart.id);
    expect(cart).not.toBeNull();
    expect(cart?.id).toBe(createdCart.id);
  });

  it("should get all carts", async () => {
    const createdCart = await cartService.createCart({
      userId: createdUser.id,
    });

    const createdUser2 = await prisma.user.create({
      data: {
        email: `cartTest-${Date.now()}@gmail.com`,
        password: "password",
        username: `cartTestUser-${Date.now()}`,
      },
    });
    const createdCart2 = await cartService.createCart({
      userId: createdUser2.id,
    });

    const carts = await cartService.getAllCarts();
    expect(carts.length).toBe(2);
  });

  it("should delete a cart", async () => {
    const createdCart = await cartService.createCart({
      userId: createdUser.id,
    });
    const deletedCart = await cartService.deleteCart(createdCart.id);
    expect(deletedCart).not.toBeNull();
    const cart = await cartService.getCartById(createdCart.id);
    expect(cart).toBeNull();
  });
});
