import dotenv from 'dotenv';
dotenv.config({path: `${process.cwd()}/.env`});

export const SERVER_PORT = process.env.SERVER_PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const CORS_METHODS = (process.env.CORS_METHODS)?.split(',');
export const CORS_CREDENTIALS = process.env.CORS_CREDENTIALS = "true";

