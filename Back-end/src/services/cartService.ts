import prisma from "../config/database";
import cuid from "cuid";
import { ICart } from "../models/ICart";

export const updateCartPrice = async (cartId: string) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId,
    },
  });
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (item.price ?? 0);
  }, 0);
  await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      totalPrice: totalPrice,
    },
  });
};

export const getAllCarts = async (): Promise<ICart[]> => {
  return await prisma.cart.findMany();
};

export const getCartById = async (id: string): Promise<ICart | null> => {
  return await prisma.cart.findUnique({
    where: {
      id,
    },
  });
};

export const createCart = async (cart: Omit<ICart,"id"|"createdAt"|"updatedAt"|"totalPrice">): Promise<ICart> => {
  const newCart = {
    ...cart,
    id: cuid(),
  };
  const createdCart = await prisma.cart.create({
    data: newCart,
  });
  await updateCartPrice(createdCart.id);
  return createdCart;
};

export const deleteCart = async (id: string): Promise<ICart | null> => {
  const deletedCart = await prisma.cart.delete({
    where: {
      id,
    },
  });
  return deletedCart;
};

export const updateCart = async (
  id: string,
  cart: ICart
): Promise<ICart | null> => {
  const updatedCart = await prisma.cart.update({
    where: {
      id,
    },
    data: cart,
  });
  await updateCartPrice(updatedCart.id);
  return updatedCart;
};

export const getCartByUserId = async (userId: string): Promise<ICart | null> => {
  return await prisma.cart.findFirst({
    where: {
      userId,
    },
  });
}