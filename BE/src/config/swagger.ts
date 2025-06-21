import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import path from 'path';

const productDocs = YAML.load(path.join(process.cwd(), 'src/docs/products.swagger.yaml'));

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dienlanhhoaian API Documentation',
      version: '1.0.0',
      description: 'API documentation for Dienlanhhoaian project',
    },
    servers: [
      {
        url: 'https://api-shopdienmay.vercel.app/api/v1',
      },
    ],
    ...productDocs,
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts', 'src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
