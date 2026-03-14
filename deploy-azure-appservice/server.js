const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number.parseInt(process.env.PORT, 10) || 3000;
const buildDir = path.join(__dirname, "build");
const indexFile = path.join(buildDir, "index.html");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.statusCode = 200;
    res.setHeader(
      "Content-Type",
      contentTypes[ext] || "application/octet-stream"
    );
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  // Basic sanitization + support root
  const safeUrl = (req.url || "/").split("?")[0].split("#")[0];
  const normalized = path
    .normalize(safeUrl)
    .replace(/^([/\\])+/, "");

  const requestedPath = path.join(buildDir, normalized);

  // Serve static file if it exists
  fs.stat(requestedPath, (err, stat) => {
    if (!err && stat.isFile()) {
      sendFile(res, requestedPath);
      return;
    }

    // SPA fallback for react-router routes
    sendFile(res, indexFile);
  });
});

server.listen(port, () => {
  // Keep this simple for Azure logs
  console.log(`Frontend serving build/ on port ${port}`);
});
