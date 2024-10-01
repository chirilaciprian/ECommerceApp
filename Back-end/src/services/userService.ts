import bcrypt from "bcrypt";
import prisma from "../config/database";
import { IUser } from "../models/IUser";
import cuid from "cuid";

export const getAllUsers = async (): Promise<IUser[]> => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async (
  user: Omit<IUser, "id" | "createdAt" | "updatedAt">
): Promise<IUser> => {
  const newUser = {
    ...user,
    password: await bcrypt.hash(user.password, 10),
    id: cuid(),
  };
  return await prisma.user.create({
    data: newUser,
  });
};

export const updateUser = async (
  id: string,
  user: IUser
): Promise<IUser | null> => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const changePasswordService = async (
  id: string,
  password: string,  
): Promise<IUser | null> => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  });
};
