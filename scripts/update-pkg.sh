#!/bin/bash

export PKG=sdk-$1.tgz
export PKG2=dtp-$1.tgz

echo $PKG $PKG2

yarn build
yarn pack
cp *.tgz ../sdk-dtp/$PKG
cp *.tgz ../gateway-ts/$PKG
cd ../sdk-dtp
sed -i "/sdk-js/c\\    \"@nevermined-io/nevermined-sdk-js\": \"./$PKG\"," package.json
yarn
yarn build
yarn pack
cp *dtp*.tgz ../gateway-ts/$PKG2

cd ../gateway-ts
sed -i "/sdk-js/c\\    \"@nevermined-io/nevermined-sdk-js\": \"./$PKG\"," package.json
sed -i "/sdk-dtp/c\\    \"@nevermined-io/nevermined-sdk-dtp\": \"./$PKG2\"," package.json
yarn
yarn run setup:dev
yarn build

