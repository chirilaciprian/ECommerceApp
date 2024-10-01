import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { DATABASE_URL, TEST_DATABASE_URL } from './env';

dotenv.config();

const databaseUrl = process.env.NODE_ENV === 'test' ? TEST_DATABASE_URL : DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

export default prisma;
