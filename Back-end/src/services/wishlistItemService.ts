import prisma from "../config/database";
import cuid from "cuid";
import { IWishlistItem } from "../models/IWishlistItem";

export const getAllWishlistItems = async (): Promise<IWishlistItem[]> => {
    return await prisma.wishlistItem.findMany();
}

export const getWishlistItemById = async (id: string): Promise<IWishlistItem | null> => {
    return await prisma.wishlistItem.findUnique({
        where: {
            id,
        },
    });
}

export const createWishlistItem = async (wishlistItem: Omit<IWishlistItem, "id" | "createdAt" | "updatedAt">): Promise<IWishlistItem> => {
    const newWishlistItem = {
        ...wishlistItem,
        id: cuid(),
    };
    return await prisma.wishlistItem.create({
        data: newWishlistItem,
    });
}

export const deleteWishlistItem = async (id: string): Promise<IWishlistItem | null> => {
    return await prisma.wishlistItem.delete({
        where: {
            id,
        },
    });
}

export const updateWishlistItem = async (id: string, wishlistItem: IWishlistItem): Promise<IWishlistItem | null> => {
    return await prisma.wishlistItem.update({
        where: {
            id,
        },
        data: wishlistItem,
    });
}

export const getWishlistItemsByWishlistId = async (wishlistId: string): Promise<IWishlistItem[]> => {
    return await prisma.wishlistItem.findMany({
        where: {
            wishlistId,
        },
    });
}
