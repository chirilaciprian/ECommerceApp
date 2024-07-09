import prisma from "../config/database";
import { IOrderItem } from "../models/IOrderItem";
import cuid from "cuid";

const getProductPrice = async (productId: string): Promise<number> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  return product?.price ?? 0;
};

export const updateOrderPrice = async (orderId: string) => {
    const orderItems = await prisma.orderItem.findMany({
        where: {
        orderId,
        },
    });
    const totalPrice = orderItems.reduce(
        (total, item) => total + (item.price ?? 0),
        0
    );

    await prisma.order.update({
        where: {
        id: orderId,
        },
        data: {        
        totalPrice: totalPrice,
        },
    });
    
    };


export const getAllOrderItems = async (): Promise<IOrderItem[]> => {
  return await prisma.orderItem.findMany();
};

export const getOrderItemById = async (
  id: string
): Promise<IOrderItem | null> => {
  return await prisma.orderItem.findUnique({
    where: {
      id,
    },
  });
};

export const createOrderItem = async (
  orderItem: IOrderItem
): Promise<IOrderItem> => {
  const productPrice = await getProductPrice(orderItem.productId);
  const price = productPrice * orderItem.quantity;
  const newOrderItem = {
    ...orderItem,
    price,
    id: cuid(),
  };
  
  const createdOrderItem = await prisma.orderItem.create({
    data: newOrderItem,
  });
  await updateOrderPrice(orderItem.orderId);
  return createdOrderItem;
};

export const updateOrderItem = async (
  id: string,
  orderItem: IOrderItem
): Promise<IOrderItem | null> => {
  const updatedOrderItem = await prisma.orderItem.update({
    where: {
      id,
    },
    data: orderItem,
  });
    await updateOrderPrice(updatedOrderItem.orderId);
    return updatedOrderItem;
};

export const updateOrderItemQuantity = async (
  id: string,
  quantity: number
): Promise<IOrderItem | null> => {
  const orderItem = await getOrderItemById(id);
  if (!orderItem) {
    return null;
  }
  const newPrice = (orderItem.price ?? 0) / orderItem.quantity * quantity;
  const updatedOrderItem = await prisma.orderItem.update({
    where: {
      id,
    },
    data: {
      quantity,
      price: newPrice,
    },
  });
  await updateOrderPrice(updatedOrderItem.orderId);
  return updatedOrderItem;
}

export const deleteOrderItem = async (
  id: string
): Promise<IOrderItem | null> => {    
  const deletedOrderItem = await prisma.orderItem.delete({
    where: {
      id,
    },
  });
  await updateOrderPrice(deletedOrderItem.orderId);
  return deletedOrderItem;
};
