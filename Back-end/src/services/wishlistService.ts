import prisma from "../config/database";
import { IWhishlist } from "../models/IWhishlist";
import cuid from "cuid";

export const getAllWhishlists = async (): Promise<IWhishlist[]> => {
    return await prisma.whishlist.findMany();
};

export const getWhishlistById = async (id: string): Promise<IWhishlist | null> => {
    return await prisma.whishlist.findUnique({
        where: {
            id,
        },
    });
}

export const createWihslist = async (whishlist: Omit<IWhishlist, "id" | "createdAt" | "updatedAt">): Promise<IWhishlist> => {
    const newWhishlist = {
        ...whishlist,
        id: cuid(),
    };
    return await prisma.whishlist.create({
        data: newWhishlist,
    });
}

export const deleteWhishlist = async (id: string): Promise<IWhishlist | null> => {
    return await prisma.whishlist.delete({
        where: {
            id,
        },
    });
}

export const updateWishlist = async (id: string, whishlist: IWhishlist): Promise<IWhishlist | null> => {
    return await prisma.whishlist.update({
        where: {
            id,
        },
        data: whishlist,
    });
}

export const getWhishlistByUserId = async (userId: string): Promise<IWhishlist | null> => {
    return await prisma.whishlist.findFirst({
        where: {
            userId
        },
    });
}
