import prisma from "../../src/config/database";
import * as orderItemService from "../../src/services/orderItemService";
import cuid from "cuid";

let createdUser: any;
let createdProduct: any;
let createdOrder: any;
let createdCategory: any;

describe("orderItemService", () => {
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
        email: `orderItemTest-${Date.now()}@gmail.com`,
        password: "password",
        username: `orderItemTestUser-${Date.now()}`,
      },
    });

    createdCategory = await prisma.category.create({
      data: {
        name: "Sample category",
      },
    });

    createdProduct = await prisma.product.create({
      data: {
        name: "Sample product",
        price: 100,
        categoryId: createdCategory.id,
        image: "sample-image-url",
      },
    });

    createdOrder = await prisma.order.create({
      data: {
        userId: createdUser.id,
        status: "PENDING",
      },
    });
  });

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
});


  it("should create an order item", async () => {
    const createdOrderItem = await orderItemService.createOrderItem({
        orderId: createdOrder.id,
        productId: createdProduct.id,
        quantity: 2,
        price: 200,
        id: cuid(),
        createdAt: new Date(),
        updatedAt: new Date()
    });
    expect(createdOrderItem).toHaveProperty("id");
    expect(createdOrderItem.orderId).toBe(createdOrder.id);
    expect(createdOrderItem.productId).toBe(createdProduct.id);
    expect(createdOrderItem.quantity).toBe(2);
    expect(createdOrderItem.price).toBe(200);
  });

    it("should get an order item by id", async () => {
        const createdOrderItem = await orderItemService.createOrderItem({
            orderId: createdOrder.id,
            productId: createdProduct.id,
            quantity: 2,
            price: 200,
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const orderItem = await orderItemService.getOrderItemById(createdOrderItem.id);
        expect(orderItem).not.toBeNull();
        expect(orderItem?.id).toBe(createdOrderItem.id);
    });

    it("should get all order items", async () => {
        await orderItemService.createOrderItem({
            orderId: createdOrder.id,
            productId: createdProduct.id,
            quantity: 2,
            price: 200,
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const createdProduct2 = await prisma.product.create({
            data: {
                name: "Sample product test",
                price: 100,
                categoryId: createdCategory.id,
                image: "sample-image-url",
            },
        });

        await orderItemService.createOrderItem({
            orderId: createdOrder.id,
            productId: createdProduct2.id,
            quantity: 2,
            price: 200,
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const orderItems = await orderItemService.getAllOrderItems();
        expect(orderItems.length).toBe(2);
    });

    it("should delete an order item", async () => {
        const createdOrderItem = await orderItemService.createOrderItem({
            orderId: createdOrder.id,
            productId: createdProduct.id,
            quantity: 2,
            price: 200,
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const deletedOrderItem = await orderItemService.deleteOrderItem(createdOrderItem.id);
        expect(deletedOrderItem).not.toBeNull();
        const orderItem = await orderItemService.getOrderItemById(createdOrderItem.id);
        expect(orderItem).toBeNull();
    });

    it("should update an order item", async () => {
        const createdOrderItem = await orderItemService.createOrderItem({
            orderId: createdOrder.id,
            productId: createdProduct.id,
            quantity: 2,
            price: 200,
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const updatedOrderItem = await orderItemService.updateOrderItem(createdOrderItem.id, {
            orderId: createdOrder.id,
            productId: createdProduct.id,
            quantity: 3,
            price: 300,
            id: createdOrderItem.id,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        expect(updatedOrderItem).not.toBeNull();
        expect(updatedOrderItem?.quantity).toBe(3);
        expect(updatedOrderItem?.price).toBe(300);
    });
});
