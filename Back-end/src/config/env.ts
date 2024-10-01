import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, DATABASE_URL,TEST_DATABASE_URL, JWT_SECRET };