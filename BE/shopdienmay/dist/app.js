"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const xss_clean_1 = tslib_1.__importDefault(require("xss-clean"));
const express_mongo_sanitize_1 = tslib_1.__importDefault(require("express-mongo-sanitize"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const http = tslib_1.__importStar(require("http"));
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const config_1 = require("./config");
const databases_1 = require("./databases");
const path = require("path");
const express_rate_limit_1 = tslib_1.__importDefault(require("express-rate-limit"));
const cors_1 = tslib_1.__importDefault(require("cors"));
class App {
    constructor(routes) {
        this._app = (0, express_1.default)();
        this._env = config_1.NODE_ENV || 'development';
        this._limiter = (0, express_rate_limit_1.default)({
            max: 100,
            windowMs: 60 * 60 * 1000,
            message: 'To many requests from this IP, please try again in 1 hour!',
        });
        this._connectToMongooseDatabase(); // step 1
        this._createServer(); // step 2
        this._initializeMiddlewares(); // step 3
        this._initializeRoutes(routes); // step 4
    }
    _createServer() {
        this._server = http.createServer(this._app);
    }
    _connectToMongooseDatabase() {
        if (this._env === 'development') {
            (0, mongoose_1.set)('debug', true);
            this._app.use((0, morgan_1.default)('dev'));
            mongoose_1.default.connect(databases_1.DB_CONNECTION_LOCAL.URL, databases_1.DB_CONNECTION_LOCAL.OPTIONS).then((con) => {
                console.log('Local DB connection successfully !!!');
            });
        }
        else {
            mongoose_1.default.connect(databases_1.DB_CONNECTION_CLOUD.URL, databases_1.DB_CONNECTION_CLOUD.OPTIONS).then((con) => {
                console.log('Cloud DB connection successfully !!!');
            });
            (0, mongoose_1.set)('debug', true);
            this._app.use((0, morgan_1.default)('dev'));
        }
    }
    _initializeMiddlewares() {
        this._app.use((0, cors_1.default)({
            origin: ['http://localhost:1999', 'https://dienlanhhoaian.netlify.app'],
            credentials: true, // Nếu cần gửi cookie hoặc authentication headers
        }));
        const IMAGE_DIRECTORIES = {
            products: path.join(__dirname, 'assets', 'images', 'products'),
            users: path.join(__dirname, 'assets', 'images', 'users'),
        };
        const serveImages = (directory, urlPrefix) => {
            this._app.use(`/images/${urlPrefix}`, express_1.default.static(directory));
        };
        // Cấu hình nơi lưu ảnh products và users
        serveImages(IMAGE_DIRECTORIES.products, 'products');
        serveImages(IMAGE_DIRECTORIES.users, 'users');
        // Use helmet middleware to set a Content Security Policy (CSP)
        this._app.use(helmet_1.default.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                // Add other directives as needed
            },
        }));
        this._app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' })); // parse application/x-www-form-urlencoded
        this._app.use(express_1.default.json({ limit: '10kb' }));
        this._app.use((0, cookie_parser_1.default)());
        this._app.use((0, express_mongo_sanitize_1.default)()); // Data sanitization against NoSQL query injection - filter out $ or . in the query string.
        this._app.use((0, xss_clean_1.default)()); // Data sanitization against XSS attacks - filter out HTML in the query string.
        // this._app.use('/api/v1', this._limiter); // Limit 100 request from the same IP i n 1h
    }
    _initializeRoutes(routes) {
        routes.forEach((route) => {
            this._app.use('/api/v1', route.router);
        });
    }
    listenServer() {
        if (this._env === 'development') {
            this._server.listen(config_1.APP_PORT_LOCAL, () => {
                console.log(`🚀 Server is running on port 👉 ${config_1.APP_PORT_LOCAL} 👈`);
            });
        }
        else {
            this._server.listen(config_1.APP_PORT_CLOUD, () => {
                console.log(`🚀 Server is running on port 👉 ${config_1.APP_PORT_CLOUD} 👈`);
            });
        }
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map