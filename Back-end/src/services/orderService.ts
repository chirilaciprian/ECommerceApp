import prisma from "../config/database";
import { IOrder } from "../models/IOrder";
import cuid from "cuid";

export const getAllOrders = async (): Promise<IOrder[]> => {
  return await prisma.order.findMany();
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return await prisma.order.findUnique({
    where: {
      id,
    },
  });
};

export const createOrder = async (order: Omit<IOrder,"id"|"createdAt"|"updatedAt"|"totalPrice">): Promise<IOrder> => {
  const newOrder = {
    ...order,
    id: cuid(),
  };
  return await prisma.order.create({
    data: newOrder,
  });
};

export const deleteOrder = async (id: string): Promise<IOrder | null> => {
  return await prisma.order.delete({
    where: {
      id,
    },
  });
};

export const updateOrder = async (
  id: string,
  order: IOrder
): Promise<IOrder | null> => {
  return await prisma.order.update({
    where: {
      id,
    },
    data: order,
  });
};

export const updateOrderStatus = async ( 
    id: string, 
    status: string 
    ): Promise<IOrder | null> => {
    return await prisma.order.update({
        where: {
        id,
        },
        data: {
        status,
        },
    });
    };

export const addProductToOrder = async (
  orderId: string,
  orderItemId: string
): Promise<IOrder | null> => {
  return await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      orderItems: {
        connect: {
          id: orderItemId,
        },
      },
    },
  });
};
