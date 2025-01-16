import prisma from "../config/database";
import { IRating } from "../models/IRating";
import cuid from "cuid";

export const getAllRatings = async (): Promise<IRating[]> => {
    return await prisma.rating.findMany();
}

export const getRatingById = async (id: string): Promise<IRating | null> => {
    return await prisma.rating.findUnique({
        where: {
            id
        }
    });
}

export const getRatingsByProductId = async (productId: string): Promise<IRating[]> => {
    return await prisma.rating.findMany({
        where: {
            productId
        }
    });
}

export const createRating = async (rating: Omit<IRating, "id" | "createdAt" | "updatedAt">): Promise<IRating> => {
    const newRating = {
        ...rating,
        id: cuid()
    };
    return await prisma.rating.create({
        data: newRating
    });
}

export const deleteRating = async (id: string): Promise<IRating | null> => {
    return await prisma.rating.delete({
        where: {
            id
        }
    });
}

export const updateRating = async (id: string, rating: IRating): Promise<IRating | null> => {
    return await prisma.rating.update({
        where: {
            id
        },
        data: rating
    });
}