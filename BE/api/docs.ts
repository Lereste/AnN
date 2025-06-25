import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import type { IncomingMessage, ServerResponse } from 'http';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const html = swaggerUi.generateHTML(swaggerSpec, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.25.2/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.25.2/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.25.2/swagger-ui-standalone-preset.min.js',
    ],
  });

  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.end(html);
}
