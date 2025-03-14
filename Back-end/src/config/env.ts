import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const CORS_ORIGIN = process.env.CORS_ORIGIN;



export { PORT, DATABASE_URL,TEST_DATABASE_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASSWORD, CORS_ORIGIN };