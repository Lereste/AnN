import express, { Express } from "express";
import * as http from "http";
import { APP_HOSTNAME, APP_PORT, NODE_ENV } from "./config";
import mongoose, { set } from "mongoose";
import { DB_CONNECTION } from "./databases";
import { Routes } from "./interfaces/routes.interface";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";

export class App {
  private _app: Express = express();
  private _server: http.Server;
  private _env: string = NODE_ENV || "development";

  constructor(routes: Routes[]) {
    this._connectToMongooseDatabase(); // step 1
    this._createServer(); // step 2
    this._initializeMiddlewares(); // step 3
    this._initializeRoutes(routes); // step 4
    
    serverless(this._app);
  }

  private _createServer(): void {
    this._server = http.createServer(this._app);
  }

  private _connectToMongooseDatabase() {
    if (this._env !== "production") {
      set("debug", true);
    }

    mongoose.connect(DB_CONNECTION.URL, DB_CONNECTION.OPTIONS).then((con) => {
      // console.log(con.connection);
      console.log("DB connection successfully !!!");
    });
  }

  private _initializeMiddlewares(): void {
    this._app.use(helmet()); // Set security HTTP headers
    this._app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this._app.use(express.json());
    this._app.use(cookieParser());
  }

  private _initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this._app.use("/", route.router);
    });
  }

  public listenServer(): void {
    this._server.listen(APP_PORT, () => {
      console.log(`🚀 Server is running on port 👉 ${APP_PORT} 👈`);
    });
  }
}
