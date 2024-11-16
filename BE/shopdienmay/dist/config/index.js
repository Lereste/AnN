"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_COOKIE_EXPIRES_IN = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.DATABASE_LOCAL = exports.DATABASE_PORT = exports.APP_HOSTNAME = exports.APP_PORT = exports.NODE_ENV = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config({ path: `./${process.env.NODE_ENV}.env` }); // process.env.NODE_ENV is either 'development' or 'production'
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.APP_PORT = _a.APP_PORT, exports.APP_HOSTNAME = _a.APP_HOSTNAME, exports.DATABASE_PORT = _a.DATABASE_PORT, exports.DATABASE_LOCAL = _a.DATABASE_LOCAL, exports.JWT_SECRET = _a.JWT_SECRET, exports.JWT_EXPIRES_IN = _a.JWT_EXPIRES_IN, exports.JWT_COOKIE_EXPIRES_IN = _a.JWT_COOKIE_EXPIRES_IN;
//# sourceMappingURL=index.js.map