#!/bin/bash
rm -rf app;
mkdir app;
mkdir app/config;
yarn build;
cp -R build app;
cp .env.production app/config/.env;
cp -R config/ssl app/config;
cp package.json app;
cp next.config.js app;
cp tsconfig.json app;
cp tsconfig.server.json app;
cp server.ts app;
cp -R pages app;
cp -R lib app;
cp -R node_modules app;