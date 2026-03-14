const http = require('http');
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexHtml = path.join(buildDir, 'index.html');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent(requestPath);
  const normalized = path.normalize(decoded).replace(/^([\\/])+/, '');
  const fullPath = path.join(root, normalized);
  if (!fullPath.startsWith(root)) return null;
  return fullPath;
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    send(res, 200, { 'Content-Type': contentType }, data);
  });
}

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');

    // Basic health check
    if (url.pathname === '/health') {
      send(res, 200, { 'Content-Type': 'text/plain; charset=utf-8' }, 'OK');
      return;
    }

    // Try static file first
    const filePath = safeJoin(buildDir, url.pathname);
    if (!filePath) {
      send(res, 400, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Bad Request');
      return;
    }

    fs.stat(filePath, (err, stat) => {
      if (!err && stat.isFile()) {
        serveFile(res, filePath);
        return;
      }

      // SPA fallback for client-side routes
      if (fs.existsSync(indexHtml)) {
        serveFile(res, indexHtml);
        return;
      }

      send(
        res,
        500,
        { 'Content-Type': 'text/plain; charset=utf-8' },
        'build/index.html not found. Ensure the React app is built before starting.'
      );
    });
  });
}

function main() {
  const port = Number(process.env.PORT || 8080);
  const server = createServer();

  server.listen(port, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`Static server listening on port ${port}`);
  });
}

main();
