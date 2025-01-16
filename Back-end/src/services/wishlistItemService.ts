import prisma from "../config/database";
import { IWhishlistItem } from "../models/IWhishlistItem";
import cuid from "cuid";

export const getAllWishlistItems = async (): Promise<IWhishlistItem[]> => {
    return await prisma.whishlistItem.findMany();
}

export const getWishlistItemById = async (id: string): Promise<IWhishlistItem | null> => {
    return await prisma.whishlistItem.findUnique({
        where: {
            id,
        },
    });
}

export const createWishlistItem = async (whishlistItem: Omit<IWhishlistItem, "id" | "createdAt" | "updatedAt">): Promise<IWhishlistItem> => {
    const newWhishlistItem = {
        ...whishlistItem,
        id: cuid(),
    };
    return await prisma.whishlistItem.create({
        data: newWhishlistItem,
    });
}

export const deleteWhishlistItem = async (id: string): Promise<IWhishlistItem | null> => {
    return await prisma.whishlistItem.delete({
        where: {
            id,
        },
    });
}

export const updateWishlistItem = async (id: string, whishlistItem: IWhishlistItem): Promise<IWhishlistItem | null> => {
    return await prisma.whishlistItem.update({
        where: {
            id,
        },
        data: whishlistItem,
    });
}
