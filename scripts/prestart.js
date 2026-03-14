const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function serveExists() {
  return fs.existsSync(path.join(__dirname, '..', 'node_modules', 'serve', 'build', 'main.js'));
}

function buildExists() {
  return fs.existsSync(path.join(__dirname, '..', 'build', 'index.html'));
}

function runCmd(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }
}

function npmCmd() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function run() {
  const npm = npmCmd();

  // If serve isn't present, dependencies likely aren't installed.
  if (!serveExists()) {
    const hasLock = fs.existsSync(path.join(__dirname, '..', 'package-lock.json'));
    const installArgs = hasLock
      ? ['ci', '--no-audit', '--no-fund', '--omit=dev']
      : ['install', '--no-audit', '--no-fund', '--omit=dev'];

    console.log('Dependencies missing; running', npm, installArgs.join(' '));
    runCmd(npm, installArgs);
  }

  // If build output isn't present (e.g. deployment skipped build), build now.
  if (!buildExists()) {
    console.log('Build output missing; running', npm, 'run build');
    runCmd(npm, ['run', 'build']);
  }
}

run();
