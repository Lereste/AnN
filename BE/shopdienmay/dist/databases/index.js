"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONNECTION = void 0;
const config_1 = require("../config");
exports.DB_CONNECTION = {
    URL: `${config_1.DATABASE_LOCAL}`,
    OPTIONS: {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: 'ecommerce'
    },
};
//# sourceMappingURL=index.js.map