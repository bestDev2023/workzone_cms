#!/bin/bash
set -e

npm ci

# Server
cd server || exit
npm ci
npm run build:api
npm run build
cd ..

# Client
cd client || exit
npm ci
npm run build
cd ..

BUILD_DIR="./out/build"
mkdir -p $BUILD_DIR
rm -rf ${BUILD_DIR:?}/{.??*,*}
cp -R server/out/dist/ $BUILD_DIR/server
cp -R client/out/dist/ $BUILD_DIR/client
cp -R .elasticbeanstalk .ebextensions docker-compose.yml docker-compose.dev.yml $BUILD_DIR;

# Discard larges deps, until Rollup build works
# oazapfts is bringing TS to production deps
cd $BUILD_DIR/server/app/node_modules/
rm -rf typescript .bin/{tsserver,tsc}
rm -rf @types
rm -rf date-fns/{esm,fp}
rm -rf @aws-sdk/client-dynamodb/{dist-types,dist-es}
rm -rf rxjs/{src,_esm5,_esm2015}
cd -
echo "Workzone built into $BUILD_DIR"
