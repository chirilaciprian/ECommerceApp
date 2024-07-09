import prisma from "../config/database";
import cuid from "cuid";
import { ICartItem } from "../models/ICartItem";

const getProductPrice = async (productId: string): Promise<number> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  return product?.price ?? 0;
};

const updateCartPrice = async (cartId: string) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId,
    },
  });
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price ?? 0),
    0
);
  await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      totalPrice: totalPrice,
    },
  });
};

export const getAllCartItems = async (): Promise<ICartItem[]> => {
  return await prisma.cartItem.findMany();
};

export const getCartItemById = async (
  id: string
): Promise<ICartItem | null> => {
  return await prisma.cartItem.findUnique({
    where: {
      id,
    },
  });
};

export const createCartItem = async (
  cartItem: Omit<ICartItem, "id"| "createdAt" | "updatedAt" | "price">
): Promise<ICartItem> => {
  const productPrice = await getProductPrice(cartItem.productId);
  const price = productPrice * cartItem.quantity;
  const newCartItem = {
    ...cartItem,
    price: price,
    id: cuid(),
  };
  const createdCartItem = await prisma.cartItem.create({
    data: newCartItem,
  });
  await updateCartPrice(createdCartItem.cartId);
  return createdCartItem;
};

export const deleteCartItem = async (id: string): Promise<ICartItem | null> => {
  const deletedCartItem = await prisma.cartItem.delete({
    where: {
      id,
    },
  });
  await updateCartPrice(deletedCartItem.cartId);
  return deletedCartItem;
};

export const updateCartItemQuantity = async (
  id: string,
  quantity: number
): Promise<ICartItem | null> => {
  const cartItem = await prisma.cartItem.findUnique({
    where: {
      id,
    },
  });
  if (!cartItem) {
    return null;
  }
  const newPrice = (cartItem.price ?? 0) / cartItem.quantity * quantity;

  const updatedCartItem = await prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity,
      price: newPrice,
    },
  });
  await updateCartPrice(updatedCartItem.cartId);
  return updatedCartItem;
};
