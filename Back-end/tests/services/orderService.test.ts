import prisma from "../../src/config/database";
import * as orderService from "../../src/services/orderService";




let createdUser: any;
describe("orderService", () => {
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
        email: `orderTest-${Date.now()}@gmail.com`,
        password: "password",
        username: `orderTestUser-${Date.now()}`,
      },
    });
  });

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
  });

  it("should create an order", async () => {
    const createdOrder = await orderService.createOrder({
      userId: createdUser.id,
      status: "PENDING",
    });
    expect(createdOrder).toHaveProperty("id");
    expect(createdOrder.userId).toBe(createdUser.id);
    expect(createdOrder.status).toBe("PENDING");
  });

  it("should get an order by id", async () => {
    const createdOrder = await orderService.createOrder({
      userId: createdUser.id,
      status: "PENDING",
    });
    const order = await orderService.getOrderById(createdOrder.id);
    expect(order).not.toBeNull();
    expect(order?.id).toBe(createdOrder.id);
  });

  it("should update an order status", async () => {
    const createdOrder = await orderService.createOrder({
      userId: createdUser.id,
      status: "PENDING",
    });
    const updatedOrder = await orderService.updateOrderStatus(
      createdOrder.id,
      "COMPLETED"
    );

    expect(updatedOrder).not.toBeNull();
    expect(updatedOrder?.status).toBe("COMPLETED");
  });

  it("should delete an order ", async () => {
    const createdOrder = await orderService.createOrder({
      userId: createdUser.id,
      status: "PENDING",
    });
    const deletedOrder = await orderService.deleteOrder(createdOrder.id);
    expect(deletedOrder).not.toBeNull();
    expect(deletedOrder?.id).toBe(createdOrder.id);
  });

  it("should get all orders ", async () => {
    const createdOrder = await orderService.createOrder({
      userId: createdUser.id,
      status: "PENDING",
    });

    const createdUser2 = await prisma.user.create({
      data: {
        email: `orderTest-${Date.now()}@gmail.com`,
        password: "password",
        username: `orderTestUser-${Date.now()}`,
      },
    });

    const createdOrder2 = await orderService.createOrder({
      userId: createdUser2.id,
      status: "PENDING",
    });

    const orders = await orderService.getAllOrders();
    expect(orders.length).toBe(2);
  });
});
