import prisma from "../config/database";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import { IProduct } from "../models/IProduct";
import cuid from "cuid";
import { updateCartPrice } from "./cartService";
import { updateOrderPrice } from "./orderItemService";

const updateCartItemAndOrderItemPrice = async (productId: string, newPrice: number) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      productId
    }
  });  
  if(cartItem) {
    await prisma.cartItem.update({
      where: {
        id: cartItem.id
      },
      data: {
        price: newPrice * cartItem.quantity
      }
    });
    await updateCartPrice(cartItem.cartId);
  }
    const orderItem = await prisma.orderItem.findFirst({
      where: {
        productId
      }
    });
    if(orderItem) {
      await prisma.orderItem.update({
        where: {
          id: orderItem.id
        },
        data: {
          price: newPrice * orderItem.quantity
        }
      }); 
      await updateOrderPrice(orderItem.orderId);   
  }
}


export const getAllProducts = async (): Promise<IProduct[]> => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await prisma.product.findUnique({
    where: {
      id
    },
  });
}

export const getProductsBySkus = async (skus: string[]): Promise<IProduct[]> => {
  return await prisma.product.findMany({
    where: {
      sku: {
        in: skus,  // Using the 'in' operator to match any SKU in the array
      },
    },
  });
};


export const createProduct = async (product: Omit<IProduct,"id"|"createdAt"|"updatedAt">): Promise<IProduct> => {
    
  const category = await prisma.category.findUnique({
    where: {
      id: product.categoryId
    }
  }) 
  if (!category) {
    throw new AppError("Category not found", errorCodes.NOT_FOUND);
  }
    const newProduct = {
        ...product,        
        id: cuid()
    }

    return await prisma.product.create({
        data: newProduct
    });
}

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
    return await prisma.product.delete({
        where: {
        id
        }
    });
}

export const updateProduct = async (id: string, product: Omit<IProduct,"id"|"createdAt"|"updatedAt">): Promise<IProduct | null> => {

    const newProduct = {
        ...product,
        updatedAt: new Date()
    }
    const updatedProduct = await prisma.product.update({
        where: {
            id
        },
        data: newProduct
    });
    await updateCartItemAndOrderItemPrice(id, product.price);
    return updatedProduct;
}

export const getPaginatedProducts = async (page: number, limit: number, filters:{categoryId?:string; genre?:string}): Promise<IProduct[]> => {
    return await prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where:  {
          ...(filters.categoryId && {categoryId: filters.categoryId}),
          ...(filters.genre && {genre: filters.genre})
        }
    });
}

export const getProductsByCartId = async (cartId: string): Promise<IProduct[]> => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId
    }
  });
  const productIds = cartItems.map(cartItem => cartItem.productId);
  return await prisma.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
}

export const getProductsByWishlistId = async (wishlistId: string): Promise<IProduct[]> => {
  const wishlistItems = await prisma.wishlistItem.findMany({
    where: {
      wishlistId
    }
  });
  const productIds = wishlistItems.map(wishlistItem => wishlistItem.productId);
  return await prisma.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
}

