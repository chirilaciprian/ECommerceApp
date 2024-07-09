import prisma from "../../src/config/database";
import * as cartItemService from "../../src/services/cartItemService";
import cuid from "cuid";



let createdCategory: any;
let createdProduct: any;
let createdUser: any;
let createdCart: any;

describe("cartItemService", () => {
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
        email: `testgmail-${Date.now()}@gmail.com`, // Ensure unique email
        password: "password",
        username: `cartItemTestUser-${Date.now()}`, // Ensure unique username
      },
    });

    createdCategory = await prisma.category.create({
      data: {
        name: `CategoryTest-${Date.now()}`, // Ensure unique category name
      },
    });

    createdProduct = await prisma.product.create({
      data: {
        name: `Sample product-${Date.now()}`, // Ensure unique product name
        price: 10,
        image: "imageUrl",
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

  it("should create a cartItem", async () => {
    const cartItem = await cartItemService.createCartItem({
      quantity: 1,
      cartId: createdCart.id,
      productId: createdProduct.id,
    });

    expect(cartItem).toHaveProperty("id");
    expect(cartItem.quantity).toBe(1);
    expect(cartItem.productId).toBe(createdProduct.id);
    expect(cartItem.cartId).toBe(createdCart.id);
  });

  it("should get a cartItem by id", async () => {
    const createdCartItem = await cartItemService.createCartItem({
      quantity: 1,
      cartId: createdCart.id,
      productId: createdProduct.id,
    });

    const cartItem = await cartItemService.getCartItemById(createdCartItem.id);
    expect(cartItem).not.toBeNull();
    expect(cartItem?.id).toBe(createdCartItem.id);
    expect(cartItem?.quantity).toBe(1);
    expect(cartItem?.productId).toBe(createdProduct.id);
    expect(cartItem?.cartId).toBe(createdCart.id);
  });

  it("should delete a cartItem", async () => {
    const createdCartItem = await cartItemService.createCartItem({
      quantity: 1,
      cartId: createdCart.id,
      productId: createdProduct.id,
    });

    const deletedCartItem = await cartItemService.deleteCartItem(
      createdCartItem.id
    );
    expect(deletedCartItem).not.toBeNull();

    const cartItem = await cartItemService.getCartItemById(createdCartItem.id);
    expect(cartItem).toBeNull();
  });

  it("should get all cartItems", async () => {
    const cartItem1 = await cartItemService.createCartItem({
      quantity: 1,
      cartId: createdCart.id,
      productId: createdProduct.id,
    });

    const product2 = await prisma.product.create({
      data: {
        name: `Sample product 2-${Date.now()}`, // Ensure unique product name
        price: 20,
        image: "imageUrl",
        categoryId: createdCategory.id,
      },
    });
    const cartItem2 = await cartItemService.createCartItem({
      quantity: 2,
      cartId: createdCart.id,
      productId: product2.id,
    });

    const cartItems = await cartItemService.getAllCartItems();
    expect(cartItems).toHaveLength(2);
  });

  it("should update a cartItem quantity", async () => {
    const createdCartItem = await cartItemService.createCartItem({
      quantity: 1,
      cartId: createdCart.id,
      productId: createdProduct.id,
    });

    const updatedCartItem = await cartItemService.updateCartItemQuantity(
      createdCartItem.id,
      10
    );

    expect(updatedCartItem).not.toBeNull();
    expect(updatedCartItem?.quantity).toBe(10);
  });
  
  it("should update a cartItem quantity when cartItem does not exist", async () => {
    const updatedCartItem = await cartItemService.updateCartItemQuantity(
      cuid(),
      10
    );

    expect(updatedCartItem).toBeNull();
  });
});
