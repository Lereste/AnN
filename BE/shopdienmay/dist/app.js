"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const http = tslib_1.__importStar(require("http"));
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const config_1 = require("./config");
const databases_1 = require("./databases");
const path = require("path");
class App {
    constructor(routes) {
        this._app = (0, express_1.default)();
        this._env = config_1.NODE_ENV || 'development';
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
            mongoose_1.default.connect(databases_1.DB_CONNECTION_LOCAL.URL, databases_1.DB_CONNECTION_LOCAL.OPTIONS).then((con) => {
                console.log('Local DB connection successfully !!!');
            });
        }
        else {
            mongoose_1.default.connect(databases_1.DB_CONNECTION_CLOUD.URL, databases_1.DB_CONNECTION_CLOUD.OPTIONS).then((con) => {
                console.log('Cloud DB connection successfully !!!');
            });
        }
    }
    _initializeMiddlewares() {
        this._app.use(express_1.default.static(path.join(__dirname, 'assets')));
        this._app.use((0, helmet_1.default)()); // Set security HTTP headers
        this._app.use(express_1.default.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
        this._app.use(express_1.default.json());
        this._app.use((0, cookie_parser_1.default)());
    }
    _initializeRoutes(routes) {
        routes.forEach((route) => {
            this._app.use('/', route.router);
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