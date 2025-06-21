import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import helmet from 'helmet';
import xssClean from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import * as http from 'http';
import mongoose, { set } from 'mongoose';
import { APP_PORT_CLOUD, APP_PORT_LOCAL, NODE_ENV } from './config';
import { CORS_ORIGINS } from './config/cors';
import { DB_CONNECTION_CLOUD, DB_CONNECTION_LOCAL } from './databases';
import { Routes } from './interfaces/routes.interface';
import path = require('path');
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

export class App {
  private _app: Express = express();
  private _server: http.Server;
  private _env: string = NODE_ENV || 'development';
  private _limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'To many requests from this IP, please try again in 1 hour!',
  });

  constructor(routes: Routes[]) {
    this._connectToMongooseDatabase(); // step 1
    this._createServer(); // step 2
    this._initializeMiddlewares(); // step 3
    this._initializeRoutes(routes); // step 4
  }

  private _createServer(): void {
    this._server = http.createServer(this._app);
  }

  private _connectToMongooseDatabase() {
    if (this._env === 'development') {
      set('debug', true);
      this._app.use(morgan('dev'));

      mongoose.connect(DB_CONNECTION_LOCAL.URL, DB_CONNECTION_LOCAL.OPTIONS).then((con) => {
        console.log('Local DB connection successfully !!!');
      });
    } else {
      mongoose.connect(DB_CONNECTION_CLOUD.URL, DB_CONNECTION_CLOUD.OPTIONS).then((con) => {
        console.log('Cloud DB connection successfully !!!');
      });

      // set('debug', true);
      // this._app.use(morgan('dev'));
    }
  }

  private _initializeMiddlewares(): void {
    this._app.use(
      cors({
        origin: CORS_ORIGINS,
        credentials: true, // Nếu cần gửi cookie hoặc authentication headers
      })
    );

    const IMAGE_DIRECTORIES = {
      products: path.join(__dirname, 'assets', 'images', 'products'),
      users: path.join(__dirname, 'assets', 'images', 'users'),
    };

    const serveImages = (directory: string, urlPrefix: string) => {
      this._app.use(`/images/${urlPrefix}`, express.static(directory));
    };

    // Cấu hình nơi lưu ảnh products và users
    serveImages(IMAGE_DIRECTORIES.products, 'products');
    serveImages(IMAGE_DIRECTORIES.users, 'users');

    // Use helmet middleware to set a Content Security Policy (CSP)
    this._app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          // Add other directives as needed
        },
      })
    );
    this._app.use(express.urlencoded({ extended: true, limit: '10kb' })); // parse application/x-www-form-urlencoded
    this._app.use(express.json({ limit: '10kb' }));
    this._app.use(cookieParser());
    this._app.use(mongoSanitize()); // Data sanitization against NoSQL query injection - filter out $ or . in the query string.
    this._app.use(xssClean()); // Data sanitization against XSS attacks - filter out HTML in the query string.
    // this._app.use('/api/v1', this._limiter); // Limit 100 request from the same IP i n 1h
  }

  private _initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this._app.use('/api/v1', route.router);
    });
    this._app.use('docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  public listenServer(): void {
    if (this._env === 'development') {
      this._server.listen(APP_PORT_LOCAL, () => {
        console.log(`🚀 Server is running on port 👉 ${APP_PORT_LOCAL} 👈`);
      });
    } else {
      this._server.listen(APP_PORT_CLOUD, () => {
        console.log(`🚀 Server is running on port 👉 ${APP_PORT_CLOUD} 👈`);
      });
    }
  }
}
