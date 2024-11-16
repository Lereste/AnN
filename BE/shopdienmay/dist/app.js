"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http = tslib_1.__importStar(require("http"));
const config_1 = require("./config");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const databases_1 = require("./databases");
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const path = require("path");
class App {
    constructor(routes) {
        this._app = (0, express_1.default)();
        this._env = config_1.NODE_ENV || "development";
        this._connectToMongooseDatabase(); // step 1
        this._createServer(); // step 2
        this._initializeMiddlewares(); // step 3
        this._initializeRoutes(routes); // step 4
        // serverless(this._app);
    }
    _createServer() {
        this._server = http.createServer(this._app);
    }
    _connectToMongooseDatabase() {
        if (this._env !== "production") {
            (0, mongoose_1.set)("debug", true);
        }
        mongoose_1.default
            .connect(databases_1.DB_CONNECTION.URL, databases_1.DB_CONNECTION.OPTIONS)
            .then((con) => {
            // console.log(con.connection);
            console.log("DB connection successfully !!!");
        });
    }
    _initializeMiddlewares() {
        this._app.use(express_1.default.static(path.join(__dirname, "public")));
        this._app.use((0, helmet_1.default)()); // Set security HTTP headers
        this._app.use(express_1.default.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
        this._app.use(express_1.default.json());
        this._app.use((0, cookie_parser_1.default)());
    }
    _initializeRoutes(routes) {
        routes.forEach((route) => {
            this._app.use("/", route.router);
        });
    }
    listenServer() {
        this._server.listen(config_1.APP_PORT, () => {
            console.log(`🚀 Server is running on port 👉 ${config_1.APP_PORT} 👈`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map