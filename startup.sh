#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/site/wwwroot"

cd "$APP_DIR"

echo "Working directory: $(pwd)"
node -v
npm -v

# If dependencies are missing (common with zip deploy), install them.
if [ ! -d "node_modules" ] || [ ! -x "node_modules/.bin/serve" ]; then
  echo "node_modules missing or serve not installed. Installing dependencies..."
  if [ -f "package-lock.json" ]; then
    npm ci
  else
    npm install
  fi
fi

# If the production build is missing, build it.
if [ ! -d "build" ] || [ ! -f "build/index.html" ]; then
  echo "build/ missing. Building React app..."
  npm run build
fi

echo "Starting app..."
exec npm start
