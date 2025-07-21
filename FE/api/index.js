const path = require('path');
const fs = require('fs');

const serverDistPath = path.join(process.cwd(), 'dist/shop/server/server.mjs');

module.exports = async function handler(req, res) {
  if (!fs.existsSync(serverDistPath)) {
    return res.status(500).send('SSR bundle not found');
  }

  try {
    const module = await import(serverDistPath); // vẫn dùng import dynamic ở đây OK
    return module.app(req, res);
  } catch (err) {
    console.error('Failed to load app:', err);
    return res.status(500).send('Internal server error');
  }
}
