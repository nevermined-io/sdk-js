#!/bin/bash

# Update packages for local testing. Assumes that sdk-dtp and Node are in the same parent directory as sdk-js

export PKG=sdk-$1.tgz
export PKG2=dtp-$1.tgz

echo $PKG $PKG2

yarn build
yarn pack
cp *.tgz ../sdk-dtp/$PKG
cp *.tgz ../node/$PKG
cd ../sdk-dtp
rm *dtp*.tgz
sed -i "/sdk-js/c\\    \"@nevermined-io/nevermined-sdk-js\": \"./$PKG\"," package.json
yarn
yarn build
yarn pack
cp *dtp*.tgz ../node/$PKG2

cd ../node
sed -i "/sdk-js/c\\    \"@nevermined-io/nevermined-sdk-js\": \"./$PKG\"," package.json
sed -i "/sdk-dtp/c\\    \"@nevermined-io/nevermined-sdk-dtp\": \"./$PKG2\"," package.json
yarn
yarn run setup:dev
yarn build

