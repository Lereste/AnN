const path = require('path');
const fs = require('fs');

const serverDistPath = path.join(process.cwd(), 'dist/shop/server/server.mjs');

module.exports = async function handler(req, res) {
  // Debug log: list files in dist/shop/server
  try {
    const serverDir = path.join(process.cwd(), 'dist');
    if (fs.existsSync(serverDir)) {
      console.log('Files in dist/:', fs.readdirSync(serverDir));
    } else {
      console.log('dist/ directory does not exist');
    }
  } catch (e) {
    console.log('Error reading dist/ directory:', e);
  }

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
