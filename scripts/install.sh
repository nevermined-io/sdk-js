#!/usr/bin/env bash
set -e

npm install
cp -f node_modules/jose/package.json node_modules/jose/package.json.old
cp -rf node_modules/jose/dist/browser/* node_modules/jose
cp -f node_modules/jose/package.json.old node_modules/jose/package.json

