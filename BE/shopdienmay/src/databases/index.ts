import { DATABASE_LOCAL } from "../config";

export const DB_CONNECTION = {
  URL: `${DATABASE_LOCAL}`,
  OPTIONS: {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: 'ecommerce'
  },
};