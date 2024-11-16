import cookieParser from 'cookie-parser'
import express, { Express } from 'express'
import helmet from 'helmet'
import * as http from 'http'
import mongoose, { set } from 'mongoose'
import { APP_PORT_CLOUD, APP_PORT_LOCAL, NODE_ENV } from './config'
import { DB_CONNECTION_CLOUD, DB_CONNECTION_LOCAL } from './databases'
import { Routes } from './interfaces/routes.interface'
import path = require('path')

export class App {
  private _app: Express = express()
  private _server: http.Server
  private _env: string = NODE_ENV || 'development'

  constructor(routes: Routes[]) {
    this._connectToMongooseDatabase() // step 1
    this._createServer() // step 2
    this._initializeMiddlewares() // step 3
    this._initializeRoutes(routes) // step 4
  }

  private _createServer(): void {
    this._server = http.createServer(this._app)
  }

  private _connectToMongooseDatabase() {
    if (this._env === 'development') {
      set('debug', true)

      mongoose.connect(DB_CONNECTION_LOCAL.URL, DB_CONNECTION_LOCAL.OPTIONS).then((con) => {
        console.log('Local DB connection successfully !!!')
      })
    }

    mongoose.connect(DB_CONNECTION_CLOUD.URL, DB_CONNECTION_CLOUD.OPTIONS).then((con) => {
      console.log('Cloud DB connection successfully !!!')
    })
  }

  private _initializeMiddlewares(): void {
    this._app.use(express.static(path.join(__dirname, 'assets')))
    this._app.use(helmet()) // Set security HTTP headers
    this._app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
    this._app.use(express.json())
    this._app.use(cookieParser())
  }

  private _initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this._app.use('/', route.router)
    })
  }

  public listenServer(): void {
    if (this._env === 'development') {
      this._server.listen(APP_PORT_LOCAL, () => {
        console.log(`🚀 Server is running on port 👉 ${APP_PORT_LOCAL} 👈`)
      })
    } else {
      this._server.listen(APP_PORT_CLOUD, () => {
        console.log(`🚀 Server is running on port 👉 ${APP_PORT_CLOUD} 👈`)
      })
    }
  }
}
