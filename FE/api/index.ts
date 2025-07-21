import path from 'path';

const serverDistPath = path.join(process.cwd(), 'dist/shop/server/server.mjs');

export default async function handler(req: any, res: any) {
  const { app } = await import(serverDistPath);
  return app(req, res);
}
