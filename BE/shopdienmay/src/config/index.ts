import dotenv from "dotenv";
dotenv.config({ path: `./${process.env.NODE_ENV}.env` }); // process.env.NODE_ENV is either 'development' or 'production'

export const {
    NODE_ENV,
    APP_PORT,
    APP_HOSTNAME,
    DATABASE_PORT,
    DATABASE_LOCAL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    JWT_COOKIE_EXPIRES_IN,
} = process.env;
