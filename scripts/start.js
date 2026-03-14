const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function getServeMainPath() {
  return path.join(__dirname, '..', 'node_modules', 'serve', 'build', 'main.js');
}

function run() {
  const port = process.env.PORT || '3000';
  const serveMain = getServeMainPath();

  if (!fs.existsSync(serveMain)) {
    console.error('serve entrypoint not found at:', serveMain);
    console.error('Dependencies may not be installed. Try running `npm install` first.');
    process.exit(1);
  }

  const args = ['-s', 'build', '-l', port, '-n', '--no-port-switching'];
  const child = spawn(process.execPath, [serveMain, ...args], { stdio: 'inherit' });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

run();
