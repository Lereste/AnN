import dotenv from "dotenv";
dotenv.config({ path: `./${process.env.NODE_ENV}.env` }); // process.env.NODE_ENV is either 'development' or 'production'

export const {
    NODE_ENV,
    APP_PORT_LOCAL,
    APP_HOSTNAME_LOCAL,
    DATABASE_PORT_LOCAL,
    DATABASE_LOCAL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    JWT_COOKIE_EXPIRES_IN,
    APP_PORT_CLOUD,
    MONGO_CLOUD_USERNAME,
    MONGO_CLOUD_PASWORD,
    MONGO_CLOUD_DATABASE,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;
