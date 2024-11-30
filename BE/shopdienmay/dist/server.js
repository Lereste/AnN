"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = require("./app");
const user_routes_1 = tslib_1.__importDefault(require("./routes/user.routes"));
const product_routes_1 = tslib_1.__importDefault(require("./routes/product.routes"));
const category_routes_1 = tslib_1.__importDefault(require("./routes/category.routes"));
const review_routes_1 = tslib_1.__importDefault(require("./routes/review.routes"));
// Implement App Router
const app = new app_1.App([new user_routes_1.default(), new product_routes_1.default(), new category_routes_1.default(), new review_routes_1.default()]);
// Listen the server
app.listenServer();
//# sourceMappingURL=server.js.map