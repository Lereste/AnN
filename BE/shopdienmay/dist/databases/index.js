"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONNECTION_CLOUD = exports.DB_CONNECTION_LOCAL = void 0;
const config_1 = require("../config");
exports.DB_CONNECTION_LOCAL = {
    URL: `${config_1.DATABASE_LOCAL}`,
    OPTIONS: {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: 'shopdienmay-localdatabase'
    },
};
const _replaceMongoCredentials = (connectionString, userName, password) => {
    if (!connectionString)
        return null;
    return connectionString
        .replace("<MONGO_CLOUD_USERNAME>", userName)
        .replace("<MONGO_CLOUD_PASWORD>", password);
};
const mongoCloudDatabase = _replaceMongoCredentials(config_1.MONGO_CLOUD_DATABASE, config_1.MONGO_CLOUD_USERNAME, config_1.MONGO_CLOUD_PASWORD);
exports.DB_CONNECTION_CLOUD = {
    URL: mongoCloudDatabase,
    OPTIONS: {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: 'shopdienmay-database',
    },
};
//# sourceMappingURL=index.js.map