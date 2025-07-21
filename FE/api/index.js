const path = require('path');
const fs = require('fs');

const serverDistPath = path.join(process.cwd(), 'dist/shop/server/server.mjs');

// Helper function to recursively log all files and directories under a given directory
function logFilesRecursive(dir, prefix = '') {
  const fs = require('fs');
  const path = require('path');
  try {
    if (fs.existsSync(dir)) {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relPath = path.relative(process.cwd(), fullPath);
        if (fs.statSync(fullPath).isDirectory()) {
          console.log(prefix + '[DIR] ' + relPath);
          logFilesRecursive(fullPath, prefix + '  ');
        } else {
          console.log(prefix + '[FILE] ' + relPath);
        }
      });
    } else {
      console.log(prefix + '[MISSING DIR] ' + dir);
    }
  } catch (e) {
    console.log(prefix + '[ERROR] reading ' + dir + ':', e);
  }
}

module.exports = async function handler(req, res) {
  // Log toàn bộ dist/
  console.log('--- Listing dist/ ---');
  logFilesRecursive(path.join(process.cwd(), 'dist'));

  // Log toàn bộ dist/shop/
  console.log('--- Listing dist/shop/ ---');
  logFilesRecursive(path.join(process.cwd(), 'dist/shop'));

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
