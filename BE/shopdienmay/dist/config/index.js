"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.MONGO_CLOUD_DATABASE = exports.MONGO_CLOUD_PASWORD = exports.MONGO_CLOUD_USERNAME = exports.APP_PORT_CLOUD = exports.JWT_COOKIE_EXPIRES_IN = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.DATABASE_LOCAL = exports.DATABASE_PORT_LOCAL = exports.APP_HOSTNAME_LOCAL = exports.APP_PORT_LOCAL = exports.NODE_ENV = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config({ path: `./${process.env.NODE_ENV}.env` }); // process.env.NODE_ENV is either 'development' or 'production'
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.APP_PORT_LOCAL = _a.APP_PORT_LOCAL, exports.APP_HOSTNAME_LOCAL = _a.APP_HOSTNAME_LOCAL, exports.DATABASE_PORT_LOCAL = _a.DATABASE_PORT_LOCAL, exports.DATABASE_LOCAL = _a.DATABASE_LOCAL, exports.JWT_SECRET = _a.JWT_SECRET, exports.JWT_EXPIRES_IN = _a.JWT_EXPIRES_IN, exports.JWT_COOKIE_EXPIRES_IN = _a.JWT_COOKIE_EXPIRES_IN, exports.APP_PORT_CLOUD = _a.APP_PORT_CLOUD, exports.MONGO_CLOUD_USERNAME = _a.MONGO_CLOUD_USERNAME, exports.MONGO_CLOUD_PASWORD = _a.MONGO_CLOUD_PASWORD, exports.MONGO_CLOUD_DATABASE = _a.MONGO_CLOUD_DATABASE, exports.CLOUDINARY_CLOUD_NAME = _a.CLOUDINARY_CLOUD_NAME, exports.CLOUDINARY_API_KEY = _a.CLOUDINARY_API_KEY, exports.CLOUDINARY_API_SECRET = _a.CLOUDINARY_API_SECRET;
//# sourceMappingURL=index.js.map