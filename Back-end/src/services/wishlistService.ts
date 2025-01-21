import prisma from "../config/database";
import { IWishlist } from "../models/IWishlist";
import cuid from "cuid";

export const getAllWishlists = async (): Promise<IWishlist[]> => {
    return await prisma.wishlist.findMany();
};

export const getWishlistById = async (id: string): Promise<IWishlist | null> => {
    return await prisma.wishlist.findUnique({
        where: {
            id,
        },
    });
}

export const createWihslist = async (wishlist: Omit<IWishlist, "id" | "createdAt" | "updatedAt">): Promise<IWishlist> => {
    const newWishlist = {
        ...wishlist,
        id: cuid(),
    };
    return await prisma.wishlist.create({
        data: newWishlist,
    });
}

export const deleteWishlist = async (id: string): Promise<IWishlist | null> => {
    return await prisma.wishlist.delete({
        where: {
            id,
        },
    });
}

export const updateWishlist = async (id: string, wishlist: IWishlist): Promise<IWishlist | null> => {
    return await prisma.wishlist.update({
        where: {
            id,
        },
        data: wishlist,
    });
}

export const getWishlistByUserId = async (userId: string): Promise<IWishlist | null> => {
    return await prisma.wishlist.findFirst({
        where: {
            userId
        },
    });
}
