import prisma from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";

export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new AppError("User not found", errorCodes.NOT_FOUND);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid password", errorCodes.UNAUTHORIZED);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return { token };
};
