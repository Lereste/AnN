import { DATABASE_LOCAL, MONGO_CLOUD_DATABASE, MONGO_CLOUD_PASWORD, MONGO_CLOUD_USERNAME } from "../config";

export const DB_CONNECTION_LOCAL = {
  URL: `${DATABASE_LOCAL}`,
  OPTIONS: {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: 'ecommerce'
  },
};

const _replaceMongoCredentials = (connectionString: string, userName: string, password: string) => {
  if (!connectionString) return null;
  
  return connectionString
  .replace("<MONGO_CLOUD_USERNAME>", userName)
  .replace("<MONGO_CLOUD_PASWORD>", password);
}
const mongoCloudDatabase = _replaceMongoCredentials(MONGO_CLOUD_DATABASE, MONGO_CLOUD_USERNAME, MONGO_CLOUD_PASWORD);

export const DB_CONNECTION_CLOUD = {
  URL: mongoCloudDatabase,
  OPTIONS: {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: 'shopdienmay-database',
  },
}