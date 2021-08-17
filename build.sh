#!/bin/bash
rm -rf app;
mkdir app;
yarn build;
cp -R build app;
cp .env.production app;
cp package.json app;
cp next.config.js app;
cp tsconfig.json app;
cp tsconfig.server.json app;
cp -R lib app;
cp -R node_modules app;