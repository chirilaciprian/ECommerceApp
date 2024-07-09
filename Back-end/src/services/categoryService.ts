import prisma from "../config/database";
import { ICategory } from "../models/ICategory";
import cuid from "cuid";

export const getAllCategories = async (): Promise<ICategory[]> => {
  return await prisma.category.findMany();
};

export const getCategoryById = async (
  id: string
): Promise<ICategory | null> => {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
};

export const createCategory = async (
  category: ICategory
): Promise<ICategory> => {
  const newCategory = {
    ...category,
    id: cuid(),
  };
  return await prisma.category.create({
    data: newCategory,
  });
};

export const deleteCategory = async (id: string): Promise<ICategory | null> => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};

export const updateCategory = async (
  id: string,
  category: ICategory
): Promise<ICategory | null> => {
  return await prisma.category.update({
    where: {
      id,
    },
    data: category,
  });
};
