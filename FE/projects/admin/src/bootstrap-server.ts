import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cors = require('cors');
import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
app.use(cors());
app.set('view engine', 'html');
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */

const port = process.env['PORT'] || 5000;
if (isMainModule(import.meta.url)) {
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/*
  Note: If you want to run SSR in localhost
  1- comment this line if (isMainModule(import.meta.url)) {}
  2- change angular.json:
    From:
    "ssr": {
      "entry": "projects/shop/src/server.ts"
    }

    To:
    "ssr": {
      "entry": "projects/shop/src/bootstrap-server.ts"
    }
  3- package.json:
    "shop:ssr": "npm run build:shop && node dist/shop/server/server.mjs",
*/

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
