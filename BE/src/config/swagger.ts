import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import path from 'path';
import fs from 'fs';


function safeLoadYaml(file: string) {
  const fullPath = path.resolve(__dirname, file);
  if (fs.existsSync(fullPath)) {
    return YAML.load(fullPath);
  } else {
    console.warn(`⚠️ Missing swagger file: ${file}`);
    return { tags: [], paths: {} };
  }
}

// Load individual Swagger docs
const productDocs = safeLoadYaml('../docs/products.swagger.yaml');
const categoryDocs = safeLoadYaml('../docs/categories.swagger.yaml');
const reviewDocs = safeLoadYaml('../docs/reviews.swagger.yaml');
const userDocs = safeLoadYaml('../docs/users.swagger.yaml');

// Merge tags + paths only
function mergeDocs(...docs: any[]) {
  const merged = { tags: [], paths: {} };
  const tagSet = new Set<string>();

  for (const doc of docs) {
    if (doc.tags) {
      for (const tag of doc.tags) {
        if (!tagSet.has(tag.name)) {
          tagSet.add(tag.name);
          merged.tags.push(tag);
        }
      }
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
