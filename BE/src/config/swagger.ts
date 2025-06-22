import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import path from 'path';

// Load docs from YAML
const productDocs = YAML.load(path.resolve(__dirname, '../docs/products.swagger.yaml'));
const categoryDocs = YAML.load(path.resolve(__dirname, '../docs/categories.swagger.yaml'));
const reviewDocs = YAML.load(path.resolve(__dirname, '../docs/reviews.swagger.yaml'));
const userDocs = YAML.load(path.resolve(__dirname, '../docs/users.swagger.yaml'));

function mergeDocs(...docs: any[]) {
  // Merge tags and paths from all docs
  const merged = { tags: [], paths: {} };
  for (const doc of docs) {
    if (doc.tags) {
      merged.tags.push(...doc.tags);
    }
    if (doc.paths) {
      Object.assign(merged.paths, doc.paths);
    }
  }
  return merged;
}

const mergedDocs = mergeDocs(productDocs, categoryDocs, reviewDocs, userDocs);

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
    ...mergedDocs,
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts', 'src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
